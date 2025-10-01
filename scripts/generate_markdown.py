#!/usr/bin/env python3
"""
Generate markdown from a single PDF using GROBID.

This script:
1. Takes a PDF file path
2. Processes it with GROBID to get TEI XML
3. Converts TEI XML to Markdown
4. Saves the markdown to the specified output path

Usage: python generate_markdown.py <pdf_path> <output_md_path>
"""

import os
import subprocess
import sys
import tempfile
from pathlib import Path
import argparse


def process_pdf_with_grobid(pdf_path, tei_path):
    """Process a PDF file with GROBID to generate TEI XML."""
    cmd = [
        'curl',
        '-F', f'input=@{pdf_path}',
        'http://localhost:8070/api/processFulltextDocument',
        '-o', str(tei_path),
        '-s',  # Silent mode
        '-S'   # But show errors
    ]

    print(f"Processing with GROBID: {pdf_path}")
    result = subprocess.run(cmd, capture_output=True, text=True)

    if result.returncode != 0:
        print(f"Error running GROBID: {result.stderr}", file=sys.stderr)
        return False

    # Check if output file was created and has content
    if not tei_path.exists():
        print(f"Error: TEI file not created", file=sys.stderr)
        return False

    if tei_path.stat().st_size == 0:
        print(f"Error: TEI file is empty", file=sys.stderr)
        return False

    # Check if it's actually XML
    try:
        with open(tei_path, 'r', encoding='utf-8') as f:
            first_line = f.readline().strip()
            if not first_line.startswith('<?xml') and not first_line.startswith('<'):
                print(f"Error: TEI file does not appear to be XML. First line: {first_line[:100]}", file=sys.stderr)
                return False
    except Exception as e:
        print(f"Error reading TEI file: {e}", file=sys.stderr)
        return False

    return True


def convert_tei_to_markdown(tei_path, md_path):
    """Convert TEI XML to Markdown using tei_to_markdown.py."""
    # Find tei_to_markdown.py in same directory
    script_dir = Path(__file__).parent
    tei_converter = script_dir / 'tei_to_markdown.py'

    if not tei_converter.exists():
        print(f"Error: tei_to_markdown.py not found at {tei_converter}", file=sys.stderr)
        return False

    cmd = [
        sys.executable,
        str(tei_converter),
        str(tei_path),
        str(md_path),
        '--omit-references',
        '--inline-citations', 'author-title'
    ]

    print(f"Converting to Markdown: {md_path}")
    result = subprocess.run(cmd, capture_output=True, text=True)

    if result.returncode != 0:
        print(f"Error converting to Markdown: {result.stderr}", file=sys.stderr)
        return False

    return True


def generate_markdown_from_pdf(pdf_path, output_md_path):
    """
    Main function to generate markdown from a PDF.

    Args:
        pdf_path: Path to the input PDF file
        output_md_path: Path where the markdown should be saved

    Returns:
        bool: True if successful, False otherwise
    """
    pdf_path = Path(pdf_path)
    output_md_path = Path(output_md_path)

    # Validate PDF exists
    if not pdf_path.exists():
        print(f"Error: PDF file not found: {pdf_path}", file=sys.stderr)
        return False

    # Create output directory if needed
    output_md_path.parent.mkdir(parents=True, exist_ok=True)

    # Create temporary file for TEI XML
    with tempfile.NamedTemporaryFile(mode='w', suffix='.tei.xml', delete=False) as tmp:
        tei_path = Path(tmp.name)

    try:
        # Process PDF with GROBID
        if not process_pdf_with_grobid(pdf_path, tei_path):
            return False

        # Convert TEI to Markdown
        if not convert_tei_to_markdown(tei_path, output_md_path):
            return False

        print(f"Success! Markdown created at: {output_md_path}")
        return True

    finally:
        # Clean up temporary TEI file
        if tei_path.exists():
            tei_path.unlink()


def main():
    parser = argparse.ArgumentParser(description='Generate markdown from a PDF using GROBID')
    parser.add_argument('pdf_path', help='Path to the input PDF file')
    parser.add_argument('output_md_path', help='Path where the markdown should be saved')
    args = parser.parse_args()

    success = generate_markdown_from_pdf(args.pdf_path, args.output_md_path)
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
