#!/usr/bin/env python3
"""
Cleanup bibtex data in worklist.json by re-parsing from filtered.bib.

This script:
1. Properly parses filtered.bib using bibtexparser
2. Loads worklist.json
3. For each bibtex key in the worklist:
   - Finds matching entry in filtered.bib
   - Compares and updates core bibtex fields if they differ
   - Adds raw_bibtex field with the original bibtex text
   - Preserves all worklist-specific fields (status, tags, etc.)
4. Outputs what was changed
5. Saves to worklist-updated.json

Usage: python cleanup_bibtex_worklist.py
"""

import json
import sys
from pathlib import Path
import bibtexparser
from bibtexparser.bparser import BibTexParser
from bibtexparser.latexenc import latex_to_unicode


def load_bibtex(bib_file='../filtered.bib'):
    """Load and parse bibtex file."""
    bib_path = Path(bib_file)
    if not bib_path.exists():
        print(f"Error: {bib_file} not found", file=sys.stderr)
        sys.exit(1)

    with open(bib_path, 'r', encoding='utf-8') as f:
        bib_content = f.read()

    parser = BibTexParser(common_strings=True)
    bib_database = bibtexparser.loads(bib_content, parser)

    return bib_database, bib_content


def extract_raw_bibtex_entry(bib_content, entry_id):
    """Extract the raw bibtex text for a specific entry."""
    # Find the entry in the raw content
    # Look for @type{entry_id,
    lines = bib_content.split('\n')
    in_entry = False
    entry_lines = []
    brace_count = 0

    for line in lines:
        # Check if this line starts an entry with our ID
        if not in_entry and entry_id in line and '@' in line:
            in_entry = True
            entry_lines = [line]
            brace_count = line.count('{') - line.count('}')
        elif in_entry:
            entry_lines.append(line)
            brace_count += line.count('{') - line.count('}')
            # When braces balance, we've reached the end of the entry
            if brace_count == 0:
                break

    return '\n'.join(entry_lines) if entry_lines else None


def normalize_field(field_value):
    """Normalize field value by removing newlines, extra whitespace, braces, and converting LaTeX to Unicode."""
    if not field_value:
        return ""
    # Convert LaTeX encoded characters to Unicode (e.g., \\'a to á)
    try:
        normalized = latex_to_unicode(field_value)
    except:
        # If conversion fails, use original value
        normalized = field_value
    # Remove newlines and normalize whitespace
    normalized = ' '.join(normalized.split())
    # Remove braces (used in bibtex for capitalization preservation)
    normalized = normalized.replace('{', '').replace('}', '')
    return normalized.strip()


def load_worklist(worklist_file='../paper_data.json'):
    """Load worklist JSON."""
    worklist_path = Path(worklist_file)
    if not worklist_path.exists():
        print(f"Error: {worklist_file} not found", file=sys.stderr)
        sys.exit(1)

    with open(worklist_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def get_bibtex_fields(entry):
    """Extract relevant fields from a bibtexparser entry."""
    fields = {
        'type': normalize_field(entry.get('ENTRYTYPE', '')),
        'title': normalize_field(entry.get('title', '')),
        'authors': normalize_field(entry.get('author', '')),
        'year': normalize_field(entry.get('year', '')),
    }

    # Add venue-related fields (preserve original field names)
    venue_fields = ['journal', 'booktitle', 'series', 'publisher', 'school', 'institution']
    for field in venue_fields:
        if field in entry:
            fields[field] = normalize_field(entry[field])

    # Add other common fields
    other_fields = ['volume', 'number', 'pages', 'doi', 'url', 'editor', 'edition', 'address']
    for field in other_fields:
        if field in entry:
            fields[field] = normalize_field(entry[field])

    return fields


def compare_and_update(worklist_entry, bib_entry, entry_id, raw_bibtex):
    """
    Compare worklist entry with bibtex entry and update if needed.
    Returns (updated_entry, changes_list)
    """
    changes = []
    updated = worklist_entry.copy()

    # Get fields from bibtex
    bib_fields = get_bibtex_fields(bib_entry)

    # Compare each field
    for field, new_value in bib_fields.items():
        old_value = worklist_entry.get(field)

        # Normalize old value for comparison
        old_value_normalized = normalize_field(str(old_value)) if old_value else ""

        # Always update to normalized value (even if semantically the same,
        # we want to clean up formatting)
        if old_value != new_value or old_value_normalized != new_value:
            if old_value_normalized != new_value:
                # Content is actually different
                changes.append({
                    'field': field,
                    'old': old_value,
                    'new': new_value
                })
            updated[field] = new_value

    # Always add/update raw_bibtex
    if raw_bibtex:
        if 'raw_bibtex' not in worklist_entry or worklist_entry.get('raw_bibtex') != raw_bibtex:
            if 'raw_bibtex' not in worklist_entry:
                changes.append({
                    'field': 'raw_bibtex',
                    'old': None,
                    'new': '<added>'
                })
            updated['raw_bibtex'] = raw_bibtex

    return updated, changes


def main():
    print("Loading filtered.bib...")
    bib_database, bib_content = load_bibtex()

    # Create a dict for quick lookup
    bib_entries = {entry['ID']: entry for entry in bib_database.entries}

    print(f"Loaded {len(bib_entries)} entries from filtered.bib\n")

    print("Loading paper_data.json...")
    worklist = load_worklist()

    print(f"Found {len(worklist['bibtex'])} bibtex entries in paper_data.json\n")

    print("Comparing and updating entries...\n")

    # Track statistics
    total_entries = len(worklist['bibtex'])
    updated_count = 0
    not_found_count = 0
    unchanged_count = 0

    # Process each entry in worklist
    for entry_id, worklist_entry in worklist['bibtex'].items():
        # Find matching entry in bibtex
        if entry_id not in bib_entries:
            print(f"⚠️  Warning: {entry_id} not found in filtered.bib")
            not_found_count += 1
            continue

        bib_entry = bib_entries[entry_id]
        raw_bibtex = extract_raw_bibtex_entry(bib_content, entry_id)

        # Compare and update
        updated_entry, changes = compare_and_update(worklist_entry, bib_entry, entry_id, raw_bibtex)

        if changes:
            print(f"✏️  Updated {entry_id}:")
            for change in changes:
                if change['field'] == 'raw_bibtex':
                    print(f"   + {change['field']}: <added>")
                else:
                    old_display = repr(change['old'])
                    new_display = repr(change['new'])
                    print(f"   - {change['field']}: {old_display} → {new_display}")
            print()

            worklist['bibtex'][entry_id] = updated_entry
            updated_count += 1
        else:
            unchanged_count += 1

    # Save updated worklist
    output_path = Path('../paper_data-updated.json')
    print(f"\nSaving to {output_path}...")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(worklist, f, indent=2, ensure_ascii=False)

    # Print summary
    print(f"\n{'='*50}")
    print(f"Cleanup complete!")
    print(f"  Total entries: {total_entries}")
    print(f"  Updated: {updated_count}")
    print(f"  Unchanged: {unchanged_count}")
    print(f"  Not found in filtered.bib: {not_found_count}")
    print(f"\nOutput saved to: {output_path}")


if __name__ == "__main__":
    main()
