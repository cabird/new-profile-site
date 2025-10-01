#!/usr/bin/env python3
"""
Extract structured information from a paper in markdown format using OpenAI API.

This script:
1. Reads a paper in markdown format
2. Reads the paper_info_extraction.prompt template
3. Replaces {{paper_markdown}} with the actual markdown content
4. Calls OpenAI API to extract structured information
5. Writes the resulting JSON to an output file

Usage: python extract_paper_info.py <markdown_path> <output_json_path>
"""

import os
import sys
import json
import argparse
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI


def load_prompt_template(prompt_path='../prompts/paper_info_extraction.prompt'):
    """Load the prompt template file."""
    prompt_path = Path(prompt_path)
    if not prompt_path.exists():
        print(f"Error: Prompt template not found at {prompt_path}", file=sys.stderr)
        sys.exit(1)

    with open(prompt_path, 'r', encoding='utf-8') as f:
        return f.read()


def load_markdown(markdown_path):
    """Load the paper markdown file."""
    markdown_path = Path(markdown_path)
    if not markdown_path.exists():
        print(f"Error: Markdown file not found at {markdown_path}", file=sys.stderr)
        sys.exit(1)

    with open(markdown_path, 'r', encoding='utf-8') as f:
        return f.read()


def extract_paper_info(markdown_content, prompt_template, api_key, model):
    """
    Call OpenAI API to extract paper information.

    Args:
        markdown_content: The paper content in markdown format
        prompt_template: The prompt template with {{paper_markdown}} placeholder
        api_key: OpenAI API key
        model: OpenAI model to use

    Returns:
        dict: Parsed JSON response from the API
    """
    # Replace placeholder with actual markdown
    prompt = prompt_template.replace('{{paper_markdown}}', markdown_content)

    # Initialize OpenAI client
    client = OpenAI(api_key=api_key)

    try:
        # Call the API
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )

        # Extract the response content
        response_text = response.choices[0].message.content

        # Parse as JSON
        result = json.loads(response_text)
        return result

    except json.JSONDecodeError as e:
        print(f"Error: Failed to parse JSON response: {e}", file=sys.stderr)
        print(f"Response text: {response_text}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Error calling OpenAI API: {e}", file=sys.stderr)
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser(description='Extract structured information from a paper using OpenAI')
    parser.add_argument('markdown_path', help='Path to the input markdown file')
    parser.add_argument('output_json_path', help='Path where the output JSON should be saved')
    parser.add_argument('--prompt-template', default='../prompts/paper_info_extraction.prompt',
                        help='Path to the prompt template file (default: prompts/paper_info_extraction.prompt)')
    args = parser.parse_args()

    # Load environment variables
    load_dotenv()

    api_key = os.getenv('OPENAI_API_KEY')
    model = os.getenv('OPENAI_MODEL', 'gpt-4o-mini')

    if not api_key:
        print("Error: OPENAI_API_KEY not found in environment", file=sys.stderr)
        print("Please create a .env file with your API key", file=sys.stderr)
        sys.exit(1)

    # Load inputs
    print(f"Loading markdown from {args.markdown_path}...")
    markdown_content = load_markdown(args.markdown_path)

    print(f"Loading prompt template from {args.prompt_template}...")
    prompt_template = load_prompt_template(args.prompt_template)

    # Extract information
    print(f"Calling OpenAI API with model {model}...")
    result = extract_paper_info(markdown_content, prompt_template, api_key, model)

    # Create output directory if needed
    output_path = Path(args.output_json_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    # Write result to file
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(f"Success! Extracted information saved to {output_path}")
    sys.exit(0)


if __name__ == "__main__":
    main()
