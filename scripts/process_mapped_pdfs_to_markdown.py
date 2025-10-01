#!/usr/bin/env python3
"""
Process all mapped PDFs to generate markdown files.

This script:
1. Loads the paper_data.json file
2. Finds all PDFs that have been mapped to bibtex entries
3. For each mapped PDF:
   - Generates markdown using generate_markdown.py
   - Saves to markdowns/ directory with the same name as the PDF (but .md extension)
   - Updates the PDF entry in paper_data with the path to the markdown file
4. Skips PDFs that already have a markdown_file set (unless --force is used)

Usage: python process_mapped_pdfs_to_markdown.py [--force] [--pdfs-dir PDFS_DIR]
"""

import json
import sys
import subprocess
import argparse
from pathlib import Path


def load_worklist(worklist_path='../paper_data.json'):
    """Load the worklist JSON file."""
    # Resolve path relative to script location
    script_dir = Path(__file__).parent
    worklist_path = (script_dir / worklist_path).resolve()
    if not worklist_path.exists():
        print(f"Error: Worklist not found at {worklist_path}", file=sys.stderr)
        sys.exit(1)

    with open(worklist_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def get_mapped_pdfs(worklist):
    """Get list of PDFs that are mapped to bibtex entries."""
    mapped_pdfs = []

    for pdf_name, pdf_entry in worklist['pdfs'].items():
        if pdf_entry.get('status') == 'MAPPED':
            mapped_pdfs.append(pdf_name)

    return mapped_pdfs


def generate_markdown_for_pdf(pdf_name, pdfs_dir, markdowns_dir):
    """
    Generate markdown for a PDF file.

    Args:
        pdf_name: Name of the PDF file
        pdfs_dir: Directory containing the PDF files
        markdowns_dir: Directory where markdown files should be saved

    Returns:
        str: Path to the generated markdown file, or None if failed
    """
    pdf_path = pdfs_dir / pdf_name
    if not pdf_path.exists():
        print(f"  Warning: PDF file not found at {pdf_path}", file=sys.stderr)
        return None

    # Create markdown filename (same as PDF but with .md extension)
    md_name = pdf_name.replace('.pdf', '.md')
    md_path = markdowns_dir / md_name

    # Run generate_markdown.py (in same directory as this script)
    script_dir = Path(__file__).parent
    generate_script = script_dir / 'generate_markdown.py'
    cmd = [
        sys.executable,
        str(generate_script),
        str(pdf_path),
        str(md_path)
    ]

    print(f"  Generating markdown for {pdf_name}...")
    result = subprocess.run(cmd, capture_output=True, text=True)

    if result.returncode != 0:
        print(f"  Error generating markdown: {result.stderr}", file=sys.stderr)
        return None

    return str(md_path)


def update_worklist_with_markdown(pdf_name, markdown_path):
    """Update the worklist to add the markdown_file field to a PDF entry."""
    # CLI is in parent directory
    script_dir = Path(__file__).parent
    cli_script = (script_dir / '../paper_data_cli.py').resolve()
    cmd = [
        sys.executable,
        str(cli_script),
        'pdf', 'set-markdown',
        pdf_name,
        markdown_path
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)

    if result.returncode != 0:
        print(f"  Error updating worklist: {result.stderr}", file=sys.stderr)
        return False

    return True


def main():
    parser = argparse.ArgumentParser(description='Process mapped PDFs to generate markdown files')
    parser.add_argument('--force', action='store_true',
                        help='Regenerate markdown even if markdown_file is already set')
    parser.add_argument('--pdfs-dir', default='pdfs',
                        help='Directory containing PDF files (default: pdfs)')
    parser.add_argument('--markdowns-dir', default='markdowns',
                        help='Directory to save markdown files (default: markdowns)')
    args = parser.parse_args()

    # Set up directories
    pdfs_dir = Path(args.pdfs_dir)
    markdowns_dir = Path(args.markdowns_dir)

    # Create markdowns directory if it doesn't exist
    markdowns_dir.mkdir(parents=True, exist_ok=True)

    print("Loading worklist...")
    worklist = load_worklist()

    print("Finding mapped PDFs...")
    mapped_pdfs = get_mapped_pdfs(worklist)

    if not mapped_pdfs:
        print("No mapped PDFs found in worklist")
        return

    print(f"Found {len(mapped_pdfs)} mapped PDFs")

    # Filter out PDFs that already have markdown_file set (unless --force)
    pdfs_to_process = []
    for pdf_name in mapped_pdfs:
        pdf_entry = worklist['pdfs'][pdf_name]
        if args.force or not pdf_entry.get('markdown_file'):
            pdfs_to_process.append(pdf_name)
        else:
            print(f"Skipping {pdf_name} (markdown_file already set). Use --force to regenerate.")

    if not pdfs_to_process:
        print("\nNo PDFs to process (all have markdown_file set). Use --force to regenerate.")
        return

    print(f"\nProcessing {len(pdfs_to_process)} PDFs...\n")

    # Track results
    successful = 0
    failed = 0

    # Process each PDF
    for i, pdf_name in enumerate(pdfs_to_process, 1):
        print(f"[{i}/{len(pdfs_to_process)}] Processing {pdf_name}")

        # Generate markdown
        markdown_path = generate_markdown_for_pdf(pdf_name, pdfs_dir, markdowns_dir)

        if not markdown_path:
            print(f"  Failed to generate markdown")
            failed += 1
            continue

        # Update worklist
        if not update_worklist_with_markdown(pdf_name, markdown_path):
            print(f"  Failed to update worklist")
            failed += 1
            continue

        successful += 1
        print(f"  Success! Markdown saved to {markdown_path}")

    # Print summary
    print(f"\n{'='*50}")
    print(f"Processing complete!")
    print(f"  Successful: {successful}")
    print(f"  Failed: {failed}")
    print(f"  Total processed: {successful + failed}")


if __name__ == "__main__":
    main()
