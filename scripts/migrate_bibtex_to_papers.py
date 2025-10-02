#!/usr/bin/env python3
"""
Migrate paper_data.json from 'bibtex' to 'papers' naming.

This script:
1. Renames the top-level 'bibtex' key to 'papers'
2. Renames metadata.total_bibtex to metadata.total_papers
3. Updates mappings array to use 'paper_key' instead of 'bib_key'
4. Creates a backup before modifying
"""

import json
import shutil
from pathlib import Path
from datetime import datetime

def migrate_paper_data():
    """Migrate the paper_data.json structure."""

    # Paths
    data_file = Path('../paper_data.json')
    backup_file = Path(f'../paper_data.json.backup.{datetime.now().strftime("%Y%m%d_%H%M%S")}')

    if not data_file.exists():
        print(f"Error: {data_file} not found")
        return False

    # Create backup
    print(f"Creating backup: {backup_file}")
    shutil.copy(data_file, backup_file)

    # Load data
    print("Loading paper_data.json...")
    with open(data_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Migrate: rename 'bibtex' to 'papers'
    if 'bibtex' in data:
        print("Renaming 'bibtex' → 'papers'")
        data['papers'] = data.pop('bibtex')
    else:
        print("Warning: 'bibtex' key not found")

    # Migrate: rename metadata field
    if 'metadata' in data and 'total_bibtex' in data['metadata']:
        print("Renaming metadata.total_bibtex → metadata.total_papers")
        data['metadata']['total_papers'] = data['metadata'].pop('total_bibtex')

    # Migrate: update mappings array
    if 'mappings' in data:
        print(f"Updating {len(data['mappings'])} mappings...")
        for mapping in data['mappings']:
            if 'bib_key' in mapping:
                mapping['paper_key'] = mapping.pop('bib_key')

    # Migrate: update PDF entries that reference bibtex
    if 'pdfs' in data:
        print(f"Updating {len(data['pdfs'])} PDF entries...")
        for pdf_entry in data['pdfs'].values():
            if 'mapped_bibtex' in pdf_entry:
                pdf_entry['mapped_paper'] = pdf_entry.pop('mapped_bibtex')

    # Save migrated data
    print("Saving migrated data...")
    with open(data_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print("\n✓ Migration complete!")
    print(f"  Backup saved to: {backup_file}")
    print(f"  Papers: {data['metadata'].get('total_papers', 0)}")
    print(f"  PDFs: {data['metadata'].get('total_pdfs', 0)}")
    print(f"  Mappings: {data['metadata'].get('mapped_count', 0)}")

    return True

if __name__ == "__main__":
    migrate_paper_data()
