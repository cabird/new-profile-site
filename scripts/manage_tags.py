#!/usr/bin/env python3
"""
Manage tags for papers using LLM-based taxonomy generation and assignment.

Two modes:
1. generate - Generate a tag taxonomy from all paper summaries
2. assign - Assign tags to individual papers based on the taxonomy

Usage:
    python manage_tags.py generate
    python manage_tags.py assign
"""

import os
import sys
import json
import subprocess
import argparse
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI


def load_prompt_template(prompt_path):
    """Load a prompt template file."""
    prompt_path = Path(prompt_path)
    if not prompt_path.exists():
        print(f"Error: Prompt template not found at {prompt_path}", file=sys.stderr)
        sys.exit(1)

    with open(prompt_path, 'r', encoding='utf-8') as f:
        return f.read()


def load_all_paper_summaries(paper_info_dir='paper_info_json'):
    """Load all paper summaries from JSON files."""
    paper_info_dir = Path(paper_info_dir)
    if not paper_info_dir.exists():
        print(f"Error: Paper info directory not found: {paper_info_dir}", file=sys.stderr)
        sys.exit(1)

    summaries = []
    for json_file in paper_info_dir.glob('*.json'):
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
                summaries.append({
                    'file': json_file.stem,
                    'data': data
                })
        except json.JSONDecodeError as e:
            print(f"Warning: Failed to parse {json_file}: {e}", file=sys.stderr)
            continue

    return summaries


def format_summaries_for_taxonomy_generation(summaries):
    """Format paper summaries for the taxonomy generation prompt."""
    formatted = []
    for i, summary in enumerate(summaries, 1):
        data = summary['data']
        tldr = data.get('tldr', 'N/A')
        details = data.get('details', {})
        topic = details.get('topic', 'N/A')

        formatted.append(f"{i}. [{topic}] {tldr}")

    return "\n".join(formatted)


def generate_tag_taxonomy(api_key, model):
    """Generate tag taxonomy from all paper summaries."""
    print("Loading paper summaries...")
    summaries = load_all_paper_summaries()

    if not summaries:
        print("Error: No paper summaries found", file=sys.stderr)
        sys.exit(1)

    print(f"Found {len(summaries)} paper summaries")

    # Load prompt template
    print("Loading prompt template...")
    prompt_template = load_prompt_template('../prompts/tag_taxonomy_generation.prompt')

    # Format summaries
    formatted_summaries = format_summaries_for_taxonomy_generation(summaries)

    # Replace placeholder
    prompt = prompt_template.replace('{{paper_summaries}}', formatted_summaries)

    # Call OpenAI API
    print(f"Calling OpenAI API with model {model}...")
    client = OpenAI(api_key=api_key)

    try:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )

        response_text = response.choices[0].message.content

        # Parse JSON - expecting {"tags": [...]}
        result = json.loads(response_text)

        # Extract the tags array from the response
        if isinstance(result, dict) and 'tags' in result:
            taxonomy = result['tags']
        elif isinstance(result, list):
            # Fallback: if it's already an array, use it directly
            taxonomy = result
        else:
            print(f"Error: Expected JSON object with 'tags' key, got: {result}", file=sys.stderr)
            sys.exit(1)

        # Save to file
        output_path = Path('tags_taxonomy.json')
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(taxonomy, f, indent=2, ensure_ascii=False)

        print(f"\nSuccess! Tag taxonomy saved to {output_path}")
        print(f"Generated {len(taxonomy)} tags")

        # Display the tags
        print("\nGenerated tags:")
        for tag_info in taxonomy:
            if isinstance(tag_info, dict) and 'tag' in tag_info:
                print(f"  - {tag_info['tag']}: {tag_info.get('description', 'N/A')}")
            else:
                print(f"  - {tag_info}")

    except json.JSONDecodeError as e:
        print(f"Error: Failed to parse JSON response: {e}", file=sys.stderr)
        print(f"Response: {response_text}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Error calling OpenAI API: {e}", file=sys.stderr)
        sys.exit(1)


def load_tag_taxonomy():
    """Load the tag taxonomy from file."""
    taxonomy_path = Path('tags_taxonomy.json')
    if not taxonomy_path.exists():
        print("Error: tags_taxonomy.json not found. Run 'generate' mode first.", file=sys.stderr)
        sys.exit(1)

    with open(taxonomy_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def format_taxonomy_for_assignment(taxonomy):
    """Format taxonomy for the assignment prompt."""
    formatted = []
    for tag_info in taxonomy:
        formatted.append(f"- {tag_info['tag']}: {tag_info['description']}")
    return "\n".join(formatted)


def get_bibtex_key_by_stem(pdf_stem):
    """Get bibtex key using the CLI."""
    cmd = [
        sys.executable,
        '../paper_data_cli.py',
        'bibtex', 'get-by-pdf-stem',
        pdf_stem
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)

    if result.returncode != 0:
        return None

    return result.stdout.strip()


def set_tags_for_bibtex(bib_key, tags):
    """Set tags for a bibtex entry using the CLI."""
    if not tags:
        print(f"  Warning: No tags to set for {bib_key}")
        return False

    cmd = [
        sys.executable,
        '../paper_data_cli.py',
        'tags', 'set',
        'bibtex',
        bib_key
    ] + tags

    result = subprocess.run(cmd, capture_output=True, text=True)

    if result.returncode != 0:
        print(f"  Error setting tags: {result.stderr}", file=sys.stderr)
        return False

    return True


def assign_tags_to_paper(paper_summary, taxonomy_text, api_key, model):
    """Assign tags to a single paper."""
    # Load prompt template
    prompt_template = load_prompt_template('../prompts/tag_assignment.prompt')

    # Format the paper summary
    formatted_summary = json.dumps(paper_summary, indent=2)

    # Replace placeholders
    prompt = prompt_template.replace('{{tag_taxonomy}}', taxonomy_text)
    prompt = prompt.replace('{{paper_summary}}', formatted_summary)

    # Call OpenAI API
    client = OpenAI(api_key=api_key)

    try:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )

        response_text = response.choices[0].message.content

        # Parse JSON - expecting {"tags": ["tag1", "tag2", ...]}
        result = json.loads(response_text)

        # Extract tags array from response
        if isinstance(result, dict) and 'tags' in result:
            tags = result['tags']
        elif isinstance(result, list):
            # Fallback: if it's already an array, use it directly
            tags = result
        else:
            print(f"  Warning: Unexpected response format (expected dict with 'tags' key): {result}", file=sys.stderr)
            return []

        # Validate that tags is a list of strings
        if not isinstance(tags, list):
            print(f"  Warning: 'tags' value is not a list: {tags}", file=sys.stderr)
            return []

        return tags

    except json.JSONDecodeError as e:
        print(f"  Error: Failed to parse JSON response: {e}", file=sys.stderr)
        return []
    except Exception as e:
        print(f"  Error calling OpenAI API: {e}", file=sys.stderr)
        return []


def assign_tags_to_all_papers(api_key, model):
    """Assign tags to all papers based on taxonomy."""
    print("Loading tag taxonomy...")
    taxonomy = load_tag_taxonomy()
    taxonomy_text = format_taxonomy_for_assignment(taxonomy)

    print(f"Loaded {len(taxonomy)} tags from taxonomy")

    print("\nLoading paper summaries...")
    summaries = load_all_paper_summaries()

    if not summaries:
        print("Error: No paper summaries found", file=sys.stderr)
        sys.exit(1)

    print(f"Found {len(summaries)} papers to tag\n")

    # Track results
    successful = 0
    failed = 0
    skipped = 0

    # Process each paper
    for i, summary_info in enumerate(summaries, 1):
        pdf_stem = summary_info['file']
        paper_data = summary_info['data']

        print(f"[{i}/{len(summaries)}] Processing {pdf_stem}")

        # Get bibtex key
        bib_key = get_bibtex_key_by_stem(pdf_stem)
        if not bib_key:
            print(f"  Warning: No bibtex key found for PDF stem '{pdf_stem}', skipping")
            skipped += 1
            continue

        print(f"  Found bibtex key: {bib_key}")

        # Assign tags
        print(f"  Calling LLM to assign tags...")
        tags = assign_tags_to_paper(paper_data, taxonomy_text, api_key, model)

        if not tags:
            print(f"  Warning: No tags assigned")
            failed += 1
            continue

        print(f"  Assigned tags: {', '.join(tags)}")

        # Set tags via CLI
        if set_tags_for_bibtex(bib_key, tags):
            print(f"  Success!")
            successful += 1
        else:
            print(f"  Failed to set tags")
            failed += 1

    # Print summary
    print(f"\n{'='*50}")
    print(f"Tag assignment complete!")
    print(f"  Successful: {successful}")
    print(f"  Failed: {failed}")
    print(f"  Skipped: {skipped}")
    print(f"  Total processed: {successful + failed + skipped}")


def main():
    parser = argparse.ArgumentParser(description='Manage tags for papers using LLM')
    parser.add_argument('mode', choices=['generate', 'assign'],
                        help='Mode: generate taxonomy or assign tags to papers')
    args = parser.parse_args()

    # Load environment variables
    load_dotenv()

    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        print("Error: OPENAI_API_KEY not found in environment", file=sys.stderr)
        sys.exit(1)

    if args.mode == 'generate':
        model = os.getenv('OPENAI_TAG_GENERATION_MODEL')
        if not model:
            print("Error: OPENAI_TAG_GENERATION_MODEL not found in environment", file=sys.stderr)
            sys.exit(1)
        print(f"Generating tag taxonomy using model: {model}\n")
        generate_tag_taxonomy(api_key, model)

    elif args.mode == 'assign':
        model = os.getenv('OPENAI_TAG_ASSIGNMENT_MODEL')
        if not model:
            print("Error: OPENAI_TAG_ASSIGNMENT_MODEL not found in environment", file=sys.stderr)
            sys.exit(1)
        print(f"Assigning tags to papers using model: {model}\n")
        assign_tags_to_all_papers(api_key, model)


if __name__ == "__main__":
    main()
