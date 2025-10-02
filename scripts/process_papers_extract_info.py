#!/usr/bin/env python3
"""
Process all mapped papers to extract structured information using OpenAI.

This script:
1. Creates paper_info_json/ directory if it doesn't exist
2. Uses CLI to find all paper entries that have associated markdown files
3. For each entry:
   - Checks if extracted_paper_info already exists (skip unless --force)
   - Gets the markdown file path from the associated PDF
   - Calls extract_paper_info.py to generate JSON summary
   - Verifies the output JSON is valid
   - Updates the paper entry with the extracted info using CLI
4. Reports success/failure statistics

Usage: python process_papers_extract_info.py [--force]
"""

import os
import sys
import json
import subprocess
import argparse
from pathlib import Path


def ensure_paper_info_json_dir():
    """Create paper_info_json directory if it doesn't exist."""
    paper_info_dir = Path('paper_info_json')
    paper_info_dir.mkdir(exist_ok=True)
    return paper_info_dir


def get_paper_entries_with_markdown():
    """Get list of paper keys that have associated markdown files."""
    cmd = [
        sys.executable,
        '../paper_data_cli.py',
        'paper', 'list-with-markdown',
        '--status', 'MAPPED'
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)

    if result.returncode != 0:
        print(f"Error getting paper entries: {result.stderr}", file=sys.stderr)
        sys.exit(1)

    # Parse output - one bib_key per line
    bib_keys = [line.strip() for line in result.stdout.strip().split('\n') if line.strip()]
    return bib_keys


def get_paper_entry_details(bib_key):
    """Get full details of a paper entry."""
    cmd = [
        sys.executable,
        '../paper_data_cli.py',
        'get',
        'papers',
        bib_key
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)

    if result.returncode != 0:
        print(f"Error getting entry details for {bib_key}: {result.stderr}", file=sys.stderr)
        return None

    try:
        return json.loads(result.stdout)
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON for {bib_key}: {e}", file=sys.stderr)
        return None


def get_pdf_entry_details(pdf_name):
    """Get full details of a PDF entry."""
    cmd = [
        sys.executable,
        '../paper_data_cli.py',
        'get',
        'pdfs',
        pdf_name
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)

    if result.returncode != 0:
        print(f"Error getting PDF details for {pdf_name}: {result.stderr}", file=sys.stderr)
        return None

    try:
        return json.loads(result.stdout)
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON for PDF {pdf_name}: {e}", file=sys.stderr)
        return None


def extract_paper_info(markdown_path, output_json_path):
    """
    Call extract_paper_info.py to extract information from markdown.

    Returns:
        bool: True if successful, False otherwise
    """
    cmd = [
        sys.executable,
        'extract_paper_info.py',
        str(markdown_path),
        str(output_json_path)
    ]

    print(f"  Extracting information from {markdown_path}...")
    result = subprocess.run(cmd, capture_output=True, text=True)

    if result.returncode != 0:
        print(f"  Error: extract_paper_info.py failed with exit code {result.returncode}", file=sys.stderr)
        print(f"  {result.stderr}", file=sys.stderr)
        return False

    # Verify output file exists
    if not output_json_path.exists():
        print(f"  Error: Output JSON file not created at {output_json_path}", file=sys.stderr)
        return False

    # Verify it's valid JSON
    try:
        with open(output_json_path, 'r', encoding='utf-8') as f:
            json.load(f)
    except json.JSONDecodeError as e:
        print(f"  Error: Output JSON is invalid: {e}", file=sys.stderr)
        return False

    return True


def update_paper_with_extracted_info(bib_key, json_file_path):
    """Update paper entry with extracted info using CLI."""
    cmd = [
        sys.executable,
        '../paper_data_cli.py',
        'paper', 'set-extracted-info',
        bib_key,
        str(json_file_path)
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)

    if result.returncode != 0:
        print(f"  Error updating worklist: {result.stderr}", file=sys.stderr)
        return False

    return True


def main():
    parser = argparse.ArgumentParser(description='Extract structured information from all mapped papers')
    parser.add_argument('--force', action='store_true',
                        help='Regenerate extracted info even if it already exists')
    args = parser.parse_args()

    # Create paper_info_json directory
    print("Setting up paper_info_json directory...")
    paper_info_dir = ensure_paper_info_json_dir()

    # Get all paper entries with markdown
    print("Finding paper entries with markdown...")
    bib_keys = get_paper_entries_with_markdown()

    if not bib_keys:
        print("No paper entries with markdown found")
        return

    print(f"Found {len(bib_keys)} paper entries with markdown")

    # Filter entries that need processing
    entries_to_process = []
    for bib_key in bib_keys:
        bib_entry = get_paper_entry_details(bib_key)
        if not bib_entry:
            print(f"Warning: Could not get details for {bib_key}, skipping")
            continue

        # Skip if already has extracted_paper_info (unless --force)
        if not args.force and bib_entry.get('extracted_paper_info'):
            print(f"Skipping {bib_key} (extracted_paper_info already exists). Use --force to regenerate.")
            continue

        # Get PDF details to find markdown path
        mapped_pdf = bib_entry.get('mapped_pdf')
        if not mapped_pdf:
            print(f"Warning: {bib_key} has no mapped_pdf, skipping")
            continue

        pdf_entry = get_pdf_entry_details(mapped_pdf)
        if not pdf_entry:
            print(f"Warning: Could not get PDF details for {mapped_pdf}, skipping {bib_key}")
            continue

        markdown_file = pdf_entry.get('markdown_file')
        if not markdown_file:
            print(f"Warning: {mapped_pdf} has no markdown_file, skipping {bib_key}")
            continue

        entries_to_process.append({
            'bib_key': bib_key,
            'markdown_file': markdown_file
        })

    if not entries_to_process:
        print("\nNo entries to process (all have extracted_paper_info set). Use --force to regenerate.")
        return

    print(f"\nProcessing {len(entries_to_process)} entries...\n")

    # Track results
    successful = 0
    failed = 0

    # Process each entry
    for i, entry in enumerate(entries_to_process, 1):
        bib_key = entry['bib_key']
        markdown_file = entry['markdown_file']

        print(f"[{i}/{len(entries_to_process)}] Processing {bib_key}")

        # Define output path using markdown filename (without extension)
        markdown_path = Path(markdown_file)
        json_filename = markdown_path.stem + '.json'  # Use stem to get filename without extension
        output_json_path = paper_info_dir / json_filename

        # Extract information
        if not extract_paper_info(Path(markdown_file), output_json_path):
            print(f"  Failed to extract information")
            failed += 1
            continue

        # Update worklist
        if not update_paper_with_extracted_info(bib_key, output_json_path):
            print(f"  Failed to update worklist")
            failed += 1
            continue

        successful += 1
        print(f"  Success! Info saved to {output_json_path}")

    # Print summary
    print(f"\n{'='*50}")
    print(f"Processing complete!")
    print(f"  Successful: {successful}")
    print(f"  Failed: {failed}")
    print(f"  Total processed: {successful + failed}")


if __name__ == "__main__":
    main()
