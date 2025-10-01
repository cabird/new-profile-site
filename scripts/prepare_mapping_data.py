#!/usr/bin/env python3
"""
Prepare data for LLM-based mapping of bib entries to PDFs.
Creates a structured JSON with bib entries and PDF extracts for analysis.
"""

import json
import re
from pathlib import Path

def parse_bib_entries(bib_file):
    """Parse bib file to extract entries with key metadata."""
    entries = {}

    with open(bib_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all entries
    pattern = r'@(\w+)\{([^,]+),(.*?)\n\}'
    matches = re.findall(pattern, content, re.DOTALL)

    for entry_type, key, fields in matches:
        # Extract key fields
        entry = {
            'type': entry_type,
            'key': key,
            'raw': f"@{entry_type}{{{key},{fields}\n}}"
        }

        # Extract title
        title_match = re.search(r'title\s*=\s*\{([^}]+)\}', fields)
        if title_match:
            entry['title'] = title_match.group(1)

        # Extract authors
        author_match = re.search(r'author\s*=\s*\{([^}]+)\}', fields)
        if author_match:
            entry['authors'] = author_match.group(1)

        # Extract year
        year_match = re.search(r'year\s*=\s*\{(\d{4})\}', fields)
        if year_match:
            entry['year'] = year_match.group(1)

        # Extract journal/booktitle
        journal_match = re.search(r'journal\s*=\s*\{([^}]+)\}', fields)
        booktitle_match = re.search(r'booktitle\s*=\s*\{([^}]+)\}', fields)
        if journal_match:
            entry['venue'] = journal_match.group(1)
        elif booktitle_match:
            entry['venue'] = booktitle_match.group(1)

        entries[key] = entry

    return entries

def main():
    # Parse bib entries
    bib_file = Path("filtered.bib")
    if not bib_file.exists():
        print(f"Error: {bib_file} not found")
        return

    print(f"Parsing {bib_file}...")
    bib_entries = parse_bib_entries(bib_file)
    print(f"Found {len(bib_entries)} bib entries")

    # Load PDF extracts
    pdf_extracts_file = Path("pdf_extracts.json")
    if not pdf_extracts_file.exists():
        print(f"Error: {pdf_extracts_file} not found. Run extract_pdf_metadata.py first")
        return

    print(f"Loading {pdf_extracts_file}...")
    with open(pdf_extracts_file, 'r', encoding='utf-8') as f:
        pdf_extracts = json.load(f)
    print(f"Loaded {len(pdf_extracts)} PDF extracts")

    # Prepare combined data for mapping
    mapping_data = {
        'bib_entries': bib_entries,
        'pdf_count': len(pdf_extracts),
        'bib_count': len(bib_entries),
        'pdf_files': list(pdf_extracts.keys())
    }

    # Save data structure for reference
    output_file = "mapping_data.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(mapping_data, f, indent=2, ensure_ascii=False)

    print(f"\nSaved mapping data to {output_file}")
    print(f"\nSummary:")
    print(f"  - Bib entries: {len(bib_entries)}")
    print(f"  - PDF files: {len(pdf_extracts)}")
    print(f"  - PDFs with extracted text: {sum(1 for p in pdf_extracts.values() if p.get('text'))}")

    # Show first few entries for verification
    print("\nFirst 3 bib entries:")
    for i, (key, entry) in enumerate(list(bib_entries.items())[:3]):
        print(f"  {i+1}. {key}")
        if 'title' in entry:
            print(f"     Title: {entry['title'][:60]}...")
        if 'authors' in entry:
            print(f"     Authors: {entry['authors'][:60]}...")
        if 'year' in entry:
            print(f"     Year: {entry['year']}")

if __name__ == "__main__":
    main()