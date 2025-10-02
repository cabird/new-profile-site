#!/usr/bin/env python3
"""
CLI tool for managing the paper-to-PDF mapping worklist.
"""

import json
import click
from pathlib import Path
from datetime import datetime
from typing import Optional, List, Dict, Tuple
import re
import sys
from difflib import SequenceMatcher

class WorklistManager:
    """Manages the worklist data and operations."""

    def __init__(self, worklist_path: str = "paper_data.json"):
        self.worklist_path = Path(worklist_path)
        self.pdf_extracts_path = Path("pdf_extracts.json")
        self.load()

    def load(self):
        """Load the worklist from disk."""
        if not self.worklist_path.exists():
            raise FileNotFoundError(f"Worklist not found: {self.worklist_path}")

        with open(self.worklist_path, 'r', encoding='utf-8') as f:
            self.data = json.load(f)

        # Load PDF extracts if available
        self.pdf_extracts = {}
        if self.pdf_extracts_path.exists():
            with open(self.pdf_extracts_path, 'r', encoding='utf-8') as f:
                self.pdf_extracts = json.load(f)

    def save(self):
        """Save the worklist to disk."""
        self.data['metadata']['last_updated'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        with open(self.worklist_path, 'w', encoding='utf-8') as f:
            json.dump(self.data, f, indent=2, ensure_ascii=False)

    def update_status(self, item_type: str, key: str, status: str) -> bool:
        """Update the status of an item."""
        collection = self.data.get(item_type)
        if collection and key in collection:
            collection[key]['status'] = status
            self.save()
            return True
        return False

    def set_markdown_file(self, pdf_file: str, markdown_path: str) -> bool:
        """Set the markdown_file field for a PDF."""
        if pdf_file in self.data['pdfs']:
            self.data['pdfs'][pdf_file]['markdown_file'] = markdown_path
            self.save()
            return True
        return False

    def set_extracted_paper_info(self, bib_key: str, info_data: dict) -> bool:
        """Set the extracted_paper_info field for a paper entry."""
        if bib_key in self.data['papers']:
            self.data['papers'][bib_key]['extracted_paper_info'] = info_data
            self.save()
            return True
        return False

    def set_raw_bibtex(self, bib_key: str, raw_bibtex: str) -> bool:
        """Set the raw_bibtex field for a paper entry."""
        if bib_key in self.data['papers']:
            self.data['papers'][bib_key]['raw_bibtex'] = raw_bibtex
            self.save()
            return True
        return False

    def set_under_submission(self, bib_key: str, under_submission: bool) -> bool:
        """Set the under_submission field for a paper entry."""
        if bib_key in self.data['papers']:
            self.data['papers'][bib_key]['under_submission'] = under_submission
            self.save()
            return True
        return False

    def set_paper_field(self, bib_key: str, field_name: str, field_value: str) -> bool:
        """Set a field for a paper entry."""
        if bib_key in self.data['papers']:
            self.data['papers'][bib_key][field_name] = field_value
            self.save()
            return True
        return False

    def add_tags(self, item_type: str, key: str, tags: List[str]) -> bool:
        """Add tags to an item (appends to existing tags, avoiding duplicates)."""
        collection = self.data.get(item_type)
        if collection and key in collection:
            if 'tags' not in collection[key]:
                collection[key]['tags'] = []
            # Add tags, avoiding duplicates
            existing_tags = set(collection[key]['tags'])
            for tag in tags:
                if tag not in existing_tags:
                    collection[key]['tags'].append(tag)
            self.save()
            return True
        return False

    def remove_tags(self, item_type: str, key: str, tags: List[str]) -> bool:
        """Remove tags from an item."""
        collection = self.data.get(item_type)
        if collection and key in collection:
            if 'tags' in collection[key]:
                collection[key]['tags'] = [t for t in collection[key]['tags'] if t not in tags]
            self.save()
            return True
        return False

    def set_tags(self, item_type: str, key: str, tags: List[str]) -> bool:
        """Set tags for an item (replaces existing tags)."""
        collection = self.data.get(item_type)
        if collection and key in collection:
            collection[key]['tags'] = tags
            self.save()
            return True
        return False

    def get_tags(self, item_type: str, key: str) -> Optional[List[str]]:
        """Get tags for an item."""
        collection = self.data.get(item_type)
        if collection and key in collection:
            return collection[key].get('tags', [])
        return None

    def list_by_tag(self, item_type: str, tag: str) -> List[str]:
        """List all items that have a specific tag."""
        collection = self.data.get(item_type)
        if not collection:
            return []
        return [k for k, v in collection.items() if tag in v.get('tags', [])]

    def rename_tag(self, item_type: str, old_tag: str, new_tag: str) -> int:
        """Rename a tag across all items. Returns count of items updated."""
        collection = self.data.get(item_type)
        if not collection:
            return 0

        count = 0
        for key, entry in collection.items():
            if 'tags' in entry and old_tag in entry['tags']:
                # Replace old tag with new tag
                entry['tags'] = [new_tag if t == old_tag else t for t in entry['tags']]
                count += 1

        if count > 0:
            self.save()
        return count

    def add_bibtex_entry(self, bib_key: str, raw_bibtex: str, under_submission: bool = False) -> bool:
        """Add a new paper entry to the worklist."""
        if bib_key in self.data['papers']:
            return False  # Entry already exists

        # Parse the bibtex to extract fields
        try:
            import bibtexparser
            from bibtexparser.bparser import BibTexParser
            from bibtexparser.customization import convert_to_unicode

            parser = BibTexParser(common_strings=True)
            parser.customization = convert_to_unicode
            bib_db = bibtexparser.loads(raw_bibtex, parser=parser)

            if not bib_db.entries:
                return False

            entry = bib_db.entries[0]

            # Create new entry with parsed fields
            new_entry = {
                'status': 'NOT_INVESTIGATED',
                'type': entry.get('ENTRYTYPE', 'misc'),
                'title': entry.get('title', '').replace('\n', ' ').strip(),
                'authors': entry.get('author', '').replace('\n', ' ').strip(),
                'year': entry.get('year', ''),
                'raw_bibtex': raw_bibtex
            }

            # Add optional fields if present
            optional_fields = ['journal', 'booktitle', 'volume', 'number', 'pages',
                             'doi', 'url', 'note', 'publisher', 'series', 'editor',
                             'edition', 'address', 'school', 'institution', 'eprint',
                             'archivePrefix', 'primaryClass']

            for field in optional_fields:
                if field in entry:
                    new_entry[field] = entry[field].replace('\n', ' ').strip()

            # Set venue based on type
            if new_entry['type'] == 'article' and 'journal' in entry:
                new_entry['venue'] = entry['journal'].replace('\n', ' ').strip()
            elif new_entry['type'] in ['inproceedings', 'conference'] and 'booktitle' in entry:
                new_entry['venue'] = entry['booktitle'].replace('\n', ' ').strip()

            # Set under_submission flag if requested
            if under_submission:
                new_entry['under_submission'] = True

            # Add the entry
            self.data['papers'][bib_key] = new_entry
            self.data['metadata']['total_papers'] = len(self.data['papers'])
            self.save()
            return True

        except Exception as e:
            print(f"Error parsing bibtex: {e}", file=sys.stderr)
            return False

    def add_pdf_entry(self, pdf_file: str, has_text: bool = False) -> bool:
        """Add a new PDF entry to the worklist."""
        if pdf_file in self.data['pdfs']:
            return False  # Entry already exists

        self.data['pdfs'][pdf_file] = {
            'status': 'NOT_INVESTIGATED',
            'has_text': has_text
        }
        self.data['metadata']['total_pdfs'] = len(self.data['pdfs'])
        self.save()
        return True

    def add_awards(self, bib_key: str, awards: List[str]) -> bool:
        """Add awards to a paper entry (appends to existing awards, avoiding duplicates)."""
        if bib_key in self.data['papers']:
            if 'awards' not in self.data['papers'][bib_key]:
                self.data['papers'][bib_key]['awards'] = []
            # Add awards, avoiding duplicates
            existing_awards = set(self.data['papers'][bib_key]['awards'])
            for award in awards:
                if award not in existing_awards:
                    self.data['papers'][bib_key]['awards'].append(award)
            self.save()
            return True
        return False

    def remove_awards(self, bib_key: str, awards: List[str]) -> bool:
        """Remove awards from a paper entry."""
        if bib_key in self.data['papers']:
            if 'awards' in self.data['papers'][bib_key]:
                self.data['papers'][bib_key]['awards'] = [a for a in self.data['papers'][bib_key]['awards'] if a not in awards]
            self.save()
            return True
        return False

    def set_awards(self, bib_key: str, awards: List[str]) -> bool:
        """Set awards for a paper entry (replaces existing awards)."""
        if bib_key in self.data['papers']:
            self.data['papers'][bib_key]['awards'] = awards
            self.save()
            return True
        return False

    def get_awards(self, bib_key: str) -> Optional[List[str]]:
        """Get awards for a paper entry."""
        if bib_key in self.data['papers']:
            return self.data['papers'][bib_key].get('awards', [])
        return None

    def get_paper_by_pdf_stem(self, pdf_stem: str) -> Optional[str]:
        """Find paper key by PDF filename stem (without extension)."""
        # Look for PDF files that match the stem
        for pdf_name, pdf_entry in self.data['pdfs'].items():
            # Check if this PDF's stem matches
            if Path(pdf_name).stem == pdf_stem:
                # Return the mapped paper key if it exists
                return pdf_entry.get('mapped_paper')
        return None

    def get_paper_with_markdown(self, status: Optional[str] = 'MAPPED') -> List[Tuple[str, Dict]]:
        """Get paper entries that have an associated PDF with markdown."""
        results = []
        for bib_key, bib_entry in self.data['papers'].items():
            # Filter by status if specified
            if status and bib_entry['status'] != status:
                continue

            # Check if this paper has a mapped PDF
            mapped_pdf = bib_entry.get('mapped_pdf')
            if not mapped_pdf:
                continue

            # Check if the PDF has a markdown file
            if mapped_pdf in self.data['pdfs']:
                pdf_entry = self.data['pdfs'][mapped_pdf]
                if pdf_entry.get('markdown_file'):
                    results.append((bib_key, bib_entry))

        return results

    def get_status(self, item_type: str, key: str) -> Optional[str]:
        """Get the status of an item."""
        collection = self.data.get(item_type)
        if collection and key in collection:
            return collection[key]['status']
        return None

    def get_next_uninvestigated(self, item_type: str) -> Optional[Tuple[str, Dict]]:
        """Get the next NOT_INVESTIGATED item."""
        collection = self.data.get(item_type)
        if collection:
            for key, value in collection.items():
                if value['status'] == 'NOT_INVESTIGATED':
                    return key, value
        return None

    def get_next_by_status(self, item_type: str, status: str) -> Optional[Tuple[str, Dict]]:
        """Get the next item with specific status."""
        collection = self.data.get(item_type)
        if collection:
            for key, value in collection.items():
                if value['status'] == status:
                    return key, value
        return None

    def list_keys(self, item_type: str, status: Optional[str] = None) -> List[str]:
        """List all keys, optionally filtered by status."""
        collection = self.data.get(item_type)
        if not collection:
            return []

        if status:
            return [k for k, v in collection.items() if v['status'] == status]
        return list(collection.keys())

    def get_entry(self, item_type: str, key: str) -> Optional[Dict]:
        """Get full details of an entry."""
        collection = self.data.get(item_type)
        if collection and key in collection:
            return collection[key]
        return None

    def create_mapping(self, bib_key: str, pdf_file: str, confidence: str = "high", notes: str = None, found: bool = False):
        """Create a mapping between paper and PDF."""
        # Update paper entry
        if bib_key in self.data['papers']:
            self.data['papers'][bib_key]['status'] = 'MAPPED'
            self.data['papers'][bib_key]['mapped_pdf'] = pdf_file
            if notes:
                self.data['papers'][bib_key]['notes'] = notes
            if found:
                self.data['papers'][bib_key]['found_pdf'] = True
                self.data['papers'][bib_key]['found_date'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        # Update PDF entry
        if pdf_file in self.data['pdfs']:
            self.data['pdfs'][pdf_file]['status'] = 'MAPPED'
            self.data['pdfs'][pdf_file]['mapped_paper'] = bib_key
        else:
            # Create new PDF entry for newly found PDFs
            self.data['pdfs'][pdf_file] = {
                'status': 'MAPPED',
                'mapped_paper': bib_key,
                'has_text': False,
                'newly_found': True,
                'found_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            }

        # Add to mappings list
        mapping = {
            'bib_key': bib_key,
            'pdf_file': pdf_file,
            'confidence': confidence,
            'verified_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        if notes:
            mapping['notes'] = notes
        if found:
            mapping['found'] = True

        self.data['mappings'].append(mapping)
        self.data['metadata']['mapped_count'] = len(self.data['mappings'])
        self.save()

    def remove_mapping(self, bib_key: str):
        """Remove a mapping."""
        # Find the mapping
        mapping_to_remove = None
        for mapping in self.data['mappings']:
            if mapping['bib_key'] == bib_key:
                mapping_to_remove = mapping
                break

        if mapping_to_remove:
            pdf_file = mapping_to_remove['pdf_file']

            # Update paper entry
            if bib_key in self.data['papers']:
                self.data['papers'][bib_key]['status'] = 'NOT_INVESTIGATED'
                self.data['papers'][bib_key]['mapped_pdf'] = None

            # Update PDF entry
            if pdf_file in self.data['pdfs']:
                self.data['pdfs'][pdf_file]['status'] = 'NOT_INVESTIGATED'
                self.data['pdfs'][pdf_file]['mapped_paper'] = None

            # Remove from mappings
            self.data['mappings'].remove(mapping_to_remove)
            self.data['metadata']['mapped_count'] = len(self.data['mappings'])
            self.save()
            return True
        return False

    def delete_entry(self, item_type: str, key: str) -> bool:
        """Delete an entry completely from the worklist."""
        collection = self.data.get(item_type)
        if not collection or key not in collection:
            return False

        # If it's a paper entry, remove any mapping first
        if item_type == 'papers':
            # Remove mapping if exists
            mapping_to_remove = None
            for mapping in self.data['mappings']:
                if mapping['bib_key'] == key:
                    mapping_to_remove = mapping
                    break

            if mapping_to_remove:
                pdf_file = mapping_to_remove['pdf_file']
                # Update PDF entry
                if pdf_file in self.data['pdfs']:
                    self.data['pdfs'][pdf_file]['status'] = 'NOT_INVESTIGATED'
                    self.data['pdfs'][pdf_file]['mapped_paper'] = None
                # Remove mapping
                self.data['mappings'].remove(mapping_to_remove)
                self.data['metadata']['mapped_count'] = len(self.data['mappings'])

        # If it's a PDF entry, remove any mapping first
        if item_type == 'pdfs':
            # Remove mapping if exists
            mapping_to_remove = None
            for mapping in self.data['mappings']:
                if mapping['pdf_file'] == key:
                    mapping_to_remove = mapping
                    break

            if mapping_to_remove:
                bib_key = mapping_to_remove['bib_key']
                # Update paper entry
                if bib_key in self.data['papers']:
                    self.data['papers'][bib_key]['status'] = 'NOT_INVESTIGATED'
                    self.data['papers'][bib_key]['mapped_pdf'] = None
                # Remove mapping
                self.data['mappings'].remove(mapping_to_remove)
                self.data['metadata']['mapped_count'] = len(self.data['mappings'])

        # Delete the entry
        del collection[key]
        self.save()
        return True

    def get_stats(self) -> Dict:
        """Get overall statistics."""
        stats = {
            'total_papers': len(self.data['papers']),
            'total_pdfs': len(self.data['pdfs']),
            'mapped': len(self.data['mappings']),
            'papers_status': {},
            'pdf_status': {}
        }

        # Count by status
        for entry in self.data['papers'].values():
            status = entry['status']
            stats['papers_status'][status] = stats['papers_status'].get(status, 0) + 1

        for entry in self.data['pdfs'].values():
            status = entry['status']
            stats['pdf_status'][status] = stats['pdf_status'].get(status, 0) + 1

        return stats

    def search(self, item_type: str, field: str, query: str) -> List[Tuple[str, Dict]]:
        """Search entries by field."""
        results = []
        collection = self.data.get(item_type)
        if not collection:
            return results

        # Split query into words and make lowercase for case-insensitive search
        query_words = query.lower().split()

        for key, entry in collection.items():
            if field in entry and entry[field]:
                field_value_lower = str(entry[field]).lower()
                # Check that ALL query words are present in the field (non-contiguous)
                if all(word in field_value_lower for word in query_words):
                    results.append((key, entry))

        return results

    def find_similar(self, item_type: str, key: str) -> List[Tuple[str, float]]:
        """Find potentially similar entries."""
        collection = self.data.get(item_type)
        if not collection or key not in collection:
            return []

        target = collection[key]
        results = []

        if item_type == 'papers':
            target_title = target.get('title', '').lower()
            target_authors = target.get('authors', '').lower()

            for other_key, other in collection.items():
                if other_key == key:
                    continue

                other_title = other.get('title', '').lower()
                other_authors = other.get('authors', '').lower()

                # Calculate similarity
                title_sim = SequenceMatcher(None, target_title, other_title).ratio()
                author_sim = SequenceMatcher(None, target_authors, other_authors).ratio()

                combined_sim = (title_sim * 0.7 + author_sim * 0.3)

                if combined_sim > 0.5:
                    results.append((other_key, combined_sim))

        return sorted(results, key=lambda x: x[1], reverse=True)[:5]

    def get_unmapped(self) -> Dict[str, List[str]]:
        """Get all unmapped items."""
        unmapped = {
            'papers': [],
            'pdfs': []
        }

        for key, entry in self.data['papers'].items():
            if entry['status'] != 'MAPPED':
                unmapped['papers'].append(key)

        for key, entry in self.data['pdfs'].items():
            if entry['status'] != 'MAPPED':
                unmapped['pdfs'].append(key)

        return unmapped

    def export_mappings(self, output_path: str = "mapping.json"):
        """Export final mappings."""
        mappings = {}
        for mapping in self.data['mappings']:
            bib_key = mapping['bib_key']
            mappings[bib_key] = {
                'pdf': mapping['pdf_file'],
                'confidence': mapping.get('confidence', 'unknown'),
                'verified_date': mapping.get('verified_date')
            }

        # Add entries with no PDF
        for key, entry in self.data['papers'].items():
            if entry['status'] == 'NO_PDF':
                mappings[key] = {
                    'pdf': None,
                    'confidence': 0,
                    'notes': 'No PDF found'
                }

        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(mappings, f, indent=2, ensure_ascii=False)

        return len(mappings)

    def get_pdf_extract(self, pdf_name: str) -> Optional[str]:
        """Get the extracted text for a PDF."""
        if pdf_name in self.pdf_extracts:
            return self.pdf_extracts[pdf_name].get('text')
        return None

    def suggest_matches_for_pdf(self, pdf_name: str, max_suggestions: int = 5) -> List[Tuple[str, Dict, float]]:
        """Suggest potential paper matches for a PDF."""
        pdf_text = self.get_pdf_extract(pdf_name)
        if not pdf_text:
            return []

        # Extract key info from PDF text (first 1000 chars usually has title/authors)
        pdf_text_lower = pdf_text[:1500].lower()
        suggestions = []

        for bib_key, bib_entry in self.data['papers'].items():
            if bib_entry['status'] == 'MAPPED':
                continue

            score = 0.0
            matches = []

            # Check title similarity
            if bib_entry.get('title'):
                title_words = bib_entry['title'].lower().split()
                # Count significant title words in PDF
                significant_words = [w for w in title_words if len(w) > 4][:5]
                title_matches = sum(1 for w in significant_words if w in pdf_text_lower)
                if title_matches >= 3:
                    score += title_matches * 0.3
                    matches.append(f"title:{title_matches} words")

            # Check authors
            if bib_entry.get('authors'):
                authors = bib_entry['authors'].lower()
                # Extract last names
                author_parts = authors.split(' and ')
                author_matches = 0
                for author in author_parts[:3]:  # Check first 3 authors
                    # Get last name
                    if ',' in author:
                        last_name = author.split(',')[0].strip()
                    else:
                        parts = author.strip().split()
                        last_name = parts[-1] if parts else ''
                    last_name = re.sub(r'[\\{}\"\']', '', last_name)
                    if len(last_name) > 3 and last_name in pdf_text_lower:
                        author_matches += 1

                if author_matches > 0:
                    score += author_matches * 0.2
                    matches.append(f"authors:{author_matches}")

            # Check year
            if bib_entry.get('year'):
                if bib_entry['year'] in pdf_text[:2000]:
                    score += 0.2
                    matches.append('year')

            if score > 0.3:
                suggestions.append((bib_key, bib_entry, score, matches))

        # Sort by score
        suggestions.sort(key=lambda x: x[2], reverse=True)
        return [(k, e, s) for k, e, s, m in suggestions[:max_suggestions]]

    def auto_map_obvious(self) -> List[Tuple[str, str]]:
        """Automatically map obvious matches based on filename patterns."""
        mapped = []

        for bib_key, bib_entry in self.data['papers'].items():
            if bib_entry['status'] != 'NOT_INVESTIGATED':
                continue

            # Extract first author's last name and year
            authors = bib_entry.get('authors', '')
            year = bib_entry.get('year', '')

            if not authors or not year:
                continue

            # Get first author's last name
            first_author = authors.split(' and ')[0].strip()
            # Handle various name formats
            if ',' in first_author:
                last_name = first_author.split(',')[0].strip()
            else:
                parts = first_author.split()
                last_name = parts[-1] if parts else ''

            last_name = last_name.lower()
            # Remove LaTeX formatting
            last_name = re.sub(r'[\\{}\"\']', '', last_name)

            # Look for matching PDFs
            for pdf_name, pdf_entry in self.data['pdfs'].items():
                if pdf_entry['status'] != 'NOT_INVESTIGATED':
                    continue

                pdf_lower = pdf_name.lower()

                # Check if author name and year are in filename
                if last_name in pdf_lower and year in pdf_lower:
                    # Additional validation - check title similarity if available
                    if self.pdf_extracts.get(pdf_name, {}).get('text'):
                        pdf_text = self.pdf_extracts[pdf_name]['text'][:500].lower()
                        title_words = bib_entry.get('title', '').lower().split()

                        # Check if significant title words appear in PDF
                        significant_words = [w for w in title_words if len(w) > 4][:3]
                        matches = sum(1 for w in significant_words if w in pdf_text)

                        if matches >= 2:
                            self.create_mapping(bib_key, pdf_name, confidence="auto-high")
                            mapped.append((bib_key, pdf_name))
                            break

        return mapped


# Create the CLI
@click.group()
@click.pass_context
def cli(ctx):
    """Worklist management tool for paper-to-PDF mapping."""
    ctx.ensure_object(dict)
    ctx.obj['manager'] = WorklistManager()

@cli.group()
def paper():
    """Paper entry management commands."""
    pass

@paper.command('add')
@click.argument('bib_key')
@click.option('--bibtex-file', type=click.Path(exists=True), help='Path to file containing raw bibtex')
@click.option('--bibtex-text', help='Raw bibtex text')
@click.option('--under-submission', is_flag=True, help='Mark as under submission')
@click.pass_context
def paper_add(ctx, bib_key, bibtex_file, bibtex_text, under_submission):
    """Add a new paper entry to the worklist."""
    manager = ctx.obj['manager']

    # Get raw bibtex from file or text
    if bibtex_file:
        with open(bibtex_file, 'r', encoding='utf-8') as f:
            raw_bibtex = f.read().strip()
    elif bibtex_text:
        raw_bibtex = bibtex_text
    else:
        # Read from stdin
        click.echo("Enter raw bibtex (press Ctrl-D when done):")
        raw_bibtex = sys.stdin.read().strip()

    if not raw_bibtex:
        click.echo("Error: No bibtex provided", err=True)
        sys.exit(1)

    if manager.add_bibtex_entry(bib_key, raw_bibtex, under_submission):
        click.echo(f"Added paper entry: {bib_key}")
        if under_submission:
            click.echo("  Marked as under submission")
    else:
        click.echo(f"Error: Failed to add paper entry (may already exist or be invalid)", err=True)
        sys.exit(1)

@paper.command('set-extracted-info')
@click.argument('bib_key')
@click.argument('json_file_path')
@click.pass_context
def paper_set_extracted_info(ctx, bib_key, json_file_path):
    """Set the extracted_paper_info field for a paper entry from a JSON file."""
    manager = ctx.obj['manager']

    # Read JSON from file
    json_path = Path(json_file_path)
    if not json_path.exists():
        click.echo(f"Error: JSON file not found: {json_file_path}", err=True)
        sys.exit(1)

    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            info_data = json.load(f)
    except json.JSONDecodeError as e:
        click.echo(f"Error: Invalid JSON in file: {e}", err=True)
        sys.exit(1)

    if manager.set_extracted_paper_info(bib_key, info_data):
        click.echo(f"Set extracted_paper_info for {bib_key}")
    else:
        click.echo(f"Error: Paper entry {bib_key} not found", err=True)
        sys.exit(1)

@paper.command('list-with-markdown')
@click.option('--status', default='MAPPED', help='Filter by paper status (default: MAPPED)')
@click.pass_context
def paper_list_with_markdown(ctx, status):
    """List paper entries that have associated markdown files."""
    manager = ctx.obj['manager']
    results = manager.get_paper_with_markdown(status)

    if results:
        for bib_key, entry in results:
            click.echo(bib_key)
    # If no results, output nothing (makes it easy to use in scripts)

@paper.command('get-by-pdf-stem')
@click.argument('pdf_stem')
@click.pass_context
def paper_get_by_pdf_stem(ctx, pdf_stem):
    """Find paper key by PDF filename stem (without extension)."""
    manager = ctx.obj['manager']
    bib_key = manager.get_paper_by_pdf_stem(pdf_stem)
    if bib_key:
        click.echo(bib_key)
    else:
        click.echo(f"Error: No paper entry found for PDF stem: {pdf_stem}", err=True)
        sys.exit(1)

@paper.command('set-raw-bibtex')
@click.argument('bib_key')
@click.argument('bibtex_file')
@click.pass_context
def paper_set_raw_bibtex(ctx, bib_key, bibtex_file):
    """Set the raw_bibtex field for a paper entry from a file."""
    manager = ctx.obj['manager']

    # Read bibtex from file
    bibtex_path = Path(bibtex_file)
    if not bibtex_path.exists():
        click.echo(f"Error: File not found: {bibtex_file}", err=True)
        sys.exit(1)

    try:
        with open(bibtex_path, 'r', encoding='utf-8') as f:
            raw_bibtex = f.read().strip()
    except Exception as e:
        click.echo(f"Error reading file: {e}", err=True)
        sys.exit(1)

    if manager.set_raw_bibtex(bib_key, raw_bibtex):
        click.echo(f"Set raw_bibtex for {bib_key}")
    else:
        click.echo(f"Error: Paper entry {bib_key} not found", err=True)
        sys.exit(1)

@paper.command('set-under-submission')
@click.argument('bib_key')
@click.argument('value', type=click.Choice(['true', 'false']))
@click.pass_context
def paper_set_under_submission(ctx, bib_key, value):
    """Set the under_submission field for a paper entry."""
    manager = ctx.obj['manager']
    under_submission = value == 'true'

    if manager.set_under_submission(bib_key, under_submission):
        click.echo(f"Set under_submission={under_submission} for {bib_key}")
    else:
        click.echo(f"Error: Paper entry {bib_key} not found", err=True)
        sys.exit(1)

@paper.command('set-field')
@click.argument('bib_key')
@click.argument('field_name')
@click.argument('field_value')
@click.pass_context
def paper_set_field(ctx, bib_key, field_name, field_value):
    """Set a field for a paper entry."""
    manager = ctx.obj['manager']

    if manager.set_paper_field(bib_key, field_name, field_value):
        click.echo(f"Set {field_name}='{field_value}' for {bib_key}")
    else:
        click.echo(f"Error: Paper entry {bib_key} not found", err=True)
        sys.exit(1)

@cli.group()
def tags():
    """Tag management commands."""
    pass

@tags.command('add')
@click.argument('item_type', type=click.Choice(['papers', 'pdfs']))
@click.argument('key')
@click.argument('tags', nargs=-1, required=True)
@click.pass_context
def tags_add(ctx, item_type, key, tags):
    """Add tags to an item (avoids duplicates)."""
    manager = ctx.obj['manager']
    if manager.add_tags(item_type, key, list(tags)):
        click.echo(f"Added tags to {key}: {', '.join(tags)}")
    else:
        click.echo(f"Error: {key} not found in {item_type}", err=True)

@tags.command('remove')
@click.argument('item_type', type=click.Choice(['papers', 'pdfs']))
@click.argument('key')
@click.argument('tags', nargs=-1, required=True)
@click.pass_context
def tags_remove(ctx, item_type, key, tags):
    """Remove tags from an item."""
    manager = ctx.obj['manager']
    if manager.remove_tags(item_type, key, list(tags)):
        click.echo(f"Removed tags from {key}: {', '.join(tags)}")
    else:
        click.echo(f"Error: {key} not found in {item_type}", err=True)

@tags.command('set')
@click.argument('item_type', type=click.Choice(['papers', 'pdfs']))
@click.argument('key')
@click.argument('tags', nargs=-1, required=True)
@click.pass_context
def tags_set(ctx, item_type, key, tags):
    """Set tags for an item (replaces existing tags)."""
    manager = ctx.obj['manager']
    if manager.set_tags(item_type, key, list(tags)):
        click.echo(f"Set tags for {key}: {', '.join(tags)}")
    else:
        click.echo(f"Error: {key} not found in {item_type}", err=True)

@tags.command('get')
@click.argument('item_type', type=click.Choice(['papers', 'pdfs']))
@click.argument('key')
@click.pass_context
def tags_get(ctx, item_type, key):
    """Get tags for an item."""
    manager = ctx.obj['manager']
    tags = manager.get_tags(item_type, key)
    if tags is not None:
        if tags:
            click.echo(', '.join(tags))
        else:
            click.echo("No tags")
    else:
        click.echo(f"Error: {key} not found in {item_type}", err=True)

@tags.command('list')
@click.argument('item_type', type=click.Choice(['papers', 'pdfs']))
@click.argument('tag')
@click.pass_context
def tags_list(ctx, item_type, tag):
    """List all items with a specific tag."""
    manager = ctx.obj['manager']
    items = manager.list_by_tag(item_type, tag)
    if items:
        for item in items:
            click.echo(item)
    else:
        click.echo(f"No {item_type} items found with tag: {tag}")

@tags.command('rename')
@click.argument('item_type', type=click.Choice(['papers', 'pdfs']))
@click.argument('old_tag')
@click.argument('new_tag')
@click.pass_context
def tags_rename(ctx, item_type, old_tag, new_tag):
    """Rename a tag across all items."""
    manager = ctx.obj['manager']
    count = manager.rename_tag(item_type, old_tag, new_tag)
    if count > 0:
        click.echo(f"Renamed tag '{old_tag}' to '{new_tag}' in {count} {item_type} items")
    else:
        click.echo(f"No {item_type} items found with tag: {old_tag}")

@cli.group()
def awards():
    """Award management commands for paper entries."""
    pass

@awards.command('add')
@click.argument('bib_key')
@click.argument('awards', nargs=-1, required=True)
@click.pass_context
def awards_add(ctx, bib_key, awards):
    """Add awards to a paper entry (avoids duplicates)."""
    manager = ctx.obj['manager']
    if manager.add_awards(bib_key, list(awards)):
        click.echo(f"Added awards to {bib_key}: {', '.join(awards)}")
    else:
        click.echo(f"Error: {bib_key} not found in paper", err=True)

@awards.command('remove')
@click.argument('bib_key')
@click.argument('awards', nargs=-1, required=True)
@click.pass_context
def awards_remove(ctx, bib_key, awards):
    """Remove awards from a paper entry."""
    manager = ctx.obj['manager']
    if manager.remove_awards(bib_key, list(awards)):
        click.echo(f"Removed awards from {bib_key}: {', '.join(awards)}")
    else:
        click.echo(f"Error: {bib_key} not found in paper", err=True)

@awards.command('set')
@click.argument('bib_key')
@click.argument('awards', nargs=-1, required=True)
@click.pass_context
def awards_set(ctx, bib_key, awards):
    """Set awards for a paper entry (replaces existing awards)."""
    manager = ctx.obj['manager']
    if manager.set_awards(bib_key, list(awards)):
        click.echo(f"Set awards for {bib_key}: {', '.join(awards)}")
    else:
        click.echo(f"Error: {bib_key} not found in paper", err=True)

@awards.command('get')
@click.argument('bib_key')
@click.pass_context
def awards_get(ctx, bib_key):
    """Get awards for a paper entry."""
    manager = ctx.obj['manager']
    awards = manager.get_awards(bib_key)
    if awards is not None:
        if awards:
            click.echo(', '.join(awards))
        else:
            click.echo("No awards")
    else:
        click.echo(f"Error: {bib_key} not found in paper", err=True)

@cli.group()
def status():
    """Status management commands."""
    pass

@status.command('update')
@click.argument('item_type', type=click.Choice(['papers', 'pdfs']))
@click.argument('key')
@click.argument('new_status', type=click.Choice(['NOT_INVESTIGATED', 'INVESTIGATING', 'MAPPED', 'NO_PDF', 'NO_BIBTEX', 'MULTIPLE_CANDIDATES']))
@click.pass_context
def status_update(ctx, item_type, key, new_status):
    """Update the status of an item."""
    manager = ctx.obj['manager']
    if manager.update_status(item_type, key, new_status):
        click.echo(f"Updated {key} status to {new_status}")
    else:
        click.echo(f"Error: {key} not found in {item_type}", err=True)

@status.command('get')
@click.argument('item_type', type=click.Choice(['papers', 'pdfs']))
@click.argument('key')
@click.pass_context
def status_get(ctx, item_type, key):
    """Get the status of an item."""
    manager = ctx.obj['manager']
    status = manager.get_status(item_type, key)
    if status:
        click.echo(f"{key}: {status}")
    else:
        click.echo(f"Error: {key} not found in {item_type}", err=True)

@cli.group()
def next():
    """Get next items for processing."""
    pass

@next.command('uninvestigated')
@click.argument('item_type', type=click.Choice(['papers', 'pdfs']))
@click.pass_context
def next_uninvestigated(ctx, item_type):
    """Get next NOT_INVESTIGATED item."""
    manager = ctx.obj['manager']
    result = manager.get_next_uninvestigated(item_type)
    if result:
        key, entry = result
        click.echo(f"Next uninvestigated: {key}")
        if item_type == 'papers':
            click.echo(f"  Title: {entry.get('title', 'N/A')[:80]}")
            click.echo(f"  Authors: {entry.get('authors', 'N/A')[:80]}")
            click.echo(f"  Year: {entry.get('year', 'N/A')}")
        else:
            click.echo(f"  Has text: {entry.get('has_text', False)}")
    else:
        click.echo(f"No uninvestigated items in {item_type}")

@next.command('by-status')
@click.argument('item_type', type=click.Choice(['papers', 'pdfs']))
@click.argument('status')
@click.pass_context
def next_by_status(ctx, item_type, status):
    """Get next item with specific status."""
    manager = ctx.obj['manager']
    result = manager.get_next_by_status(item_type, status)
    if result:
        key, entry = result
        click.echo(f"Next {status}: {key}")
    else:
        click.echo(f"No items with status {status} in {item_type}")

@cli.command('list')
@click.argument('item_type', type=click.Choice(['papers', 'pdfs']))
@click.option('--status', help='Filter by status')
@click.option('--limit', default=None, type=int, help='Limit number of results')
@click.pass_context
def list_items(ctx, item_type, status, limit):
    """List keys, optionally filtered by status."""
    manager = ctx.obj['manager']
    keys = manager.list_keys(item_type, status)

    if limit:
        keys = keys[:limit]

    if keys:
        click.echo(f"Found {len(keys)} items:")
        for key in keys:
            click.echo(f"  - {key}")
    else:
        click.echo(f"No items found")

@cli.command('get')
@click.argument('item_type', type=click.Choice(['papers', 'pdfs']))
@click.argument('key')
@click.pass_context
def get_entry(ctx, item_type, key):
    """Get full details of an entry."""
    manager = ctx.obj['manager']
    entry = manager.get_entry(item_type, key)
    if entry:
        click.echo(json.dumps(entry, indent=2))
    else:
        click.echo(f"Error: {key} not found in {item_type}", err=True)

@cli.command('delete')
@click.argument('item_type', type=click.Choice(['papers', 'pdfs']))
@click.argument('key')
@click.pass_context
def delete_entry(ctx, item_type, key):
    """Delete an entry completely from the worklist."""
    manager = ctx.obj['manager']
    if manager.delete_entry(item_type, key):
        click.echo(f"Deleted {key} from {item_type}")
    else:
        click.echo(f"Error: {key} not found in {item_type}", err=True)

@cli.group()
def map():
    """Mapping management commands."""
    pass

@map.command('create')
@click.argument('bib_key')
@click.argument('pdf_file')
@click.option('--confidence', default='high', type=click.Choice(['low', 'medium', 'high', 'auto-high']))
@click.option('--notes', help='Additional notes')
@click.option('--found', is_flag=True, help='Mark as newly found PDF')
@click.pass_context
def map_create(ctx, bib_key, pdf_file, confidence, notes, found):
    """Create a mapping between paper and PDF."""
    manager = ctx.obj['manager']
    manager.create_mapping(bib_key, pdf_file, confidence, notes, found)
    found_indicator = " [NEWLY FOUND]" if found else ""
    click.echo(f"Mapped {bib_key} → {pdf_file} (confidence: {confidence}){found_indicator}")

@map.command('remove')
@click.argument('bib_key')
@click.pass_context
def map_remove(ctx, bib_key):
    """Remove a mapping."""
    manager = ctx.obj['manager']
    if manager.remove_mapping(bib_key):
        click.echo(f"Removed mapping for {bib_key}")
    else:
        click.echo(f"Error: No mapping found for {bib_key}", err=True)

@map.command('auto')
@click.pass_context
def map_auto(ctx):
    """Automatically map obvious matches."""
    manager = ctx.obj['manager']
    mapped = manager.auto_map_obvious()
    if mapped:
        click.echo(f"Automatically mapped {len(mapped)} entries:")
        for bib_key, pdf_file in mapped:
            click.echo(f"  {bib_key} → {pdf_file}")
    else:
        click.echo("No obvious matches found")

@cli.command('search')
@click.argument('item_type', type=click.Choice(['papers', 'pdfs']))
@click.argument('field')
@click.argument('query')
@click.pass_context
def search(ctx, item_type, field, query):
    """Search entries by field."""
    manager = ctx.obj['manager']
    results = manager.search(item_type, field, query)
    if results:
        click.echo(f"Found {len(results)} matches:")
        for key, entry in results[:10]:
            click.echo(f"  {key}")
            if item_type == 'papers' and 'title' in entry:
                click.echo(f"    Title: {entry['title'][:60]}...")
    else:
        click.echo("No matches found")

@cli.command('similar')
@click.argument('item_type', type=click.Choice(['papers', 'pdfs']))
@click.argument('key')
@click.pass_context
def similar(ctx, item_type, key):
    """Find similar entries (potential duplicates)."""
    manager = ctx.obj['manager']
    results = manager.find_similar(item_type, key)
    if results:
        click.echo(f"Similar entries to {key}:")
        for similar_key, score in results:
            click.echo(f"  {similar_key} (similarity: {score:.2f})")
    else:
        click.echo("No similar entries found")

@cli.command('stats')
@click.pass_context
def stats(ctx):
    """Show overall statistics."""
    manager = ctx.obj['manager']
    stats = manager.get_stats()

    click.echo("\n=== OVERALL STATISTICS ===")
    click.echo(f"Total paper entries: {stats['total_papers']}")
    click.echo(f"Total PDFs: {stats['total_pdfs']}")
    click.echo(f"Mapped: {stats['mapped']}")

    click.echo("\n=== PAPER STATUS ===")
    for status, count in stats['papers_status'].items():
        pct = (count / stats['total_papers']) * 100
        click.echo(f"  {status}: {count} ({pct:.1f}%)")

    click.echo("\n=== PDF STATUS ===")
    for status, count in stats['pdf_status'].items():
        pct = (count / stats['total_pdfs']) * 100
        click.echo(f"  {status}: {count} ({pct:.1f}%)")

@cli.command('unmapped')
@click.pass_context
def unmapped(ctx):
    """Show unmapped items."""
    manager = ctx.obj['manager']
    unmapped = manager.get_unmapped()

    click.echo(f"Unmapped paper entries: {len(unmapped['papers'])}")
    click.echo(f"Unmapped PDFs: {len(unmapped['pdfs'])}")

    if click.confirm("Show unmapped paper entries?"):
        for key in unmapped['papers'][:20]:
            click.echo(f"  - {key}")
        if len(unmapped['papers']) > 20:
            click.echo(f"  ... and {len(unmapped['papers']) - 20} more")

    if click.confirm("Show unmapped PDFs?"):
        for key in unmapped['pdfs'][:20]:
            click.echo(f"  - {key}")
        if len(unmapped['pdfs']) > 20:
            click.echo(f"  ... and {len(unmapped['pdfs']) - 20} more")

@cli.group()
def pdf():
    """PDF-focused investigation commands."""
    pass

@pdf.command('add')
@click.argument('pdf_file')
@click.option('--has-text', is_flag=True, help='Mark as having extractable text')
@click.pass_context
def pdf_add(ctx, pdf_file, has_text):
    """Add a new PDF entry to the worklist."""
    manager = ctx.obj['manager']

    if manager.add_pdf_entry(pdf_file, has_text):
        click.echo(f"Added PDF entry: {pdf_file}")
        if has_text:
            click.echo("  Marked as having text")
    else:
        click.echo(f"Error: PDF entry already exists: {pdf_file}", err=True)
        sys.exit(1)

@pdf.command('extract')
@click.argument('pdf_file')
@click.option('--limit', default=500, help='Character limit for display')
@click.pass_context
def pdf_extract(ctx, pdf_file, limit):
    """Show extracted text from a PDF."""
    manager = ctx.obj['manager']
    text = manager.get_pdf_extract(pdf_file)
    if text:
        click.echo(f"Extracted text from {pdf_file} (first {limit} chars):\n")
        click.echo(text[:limit])
    else:
        click.echo(f"No extracted text found for {pdf_file}")

@pdf.command('suggest')
@click.argument('pdf_file')
@click.option('--max', default=5, help='Maximum number of suggestions')
@click.pass_context
def pdf_suggest(ctx, pdf_file, max):
    """Suggest potential paper matches for a PDF."""
    manager = ctx.obj['manager']
    suggestions = manager.suggest_matches_for_pdf(pdf_file, max)

    if suggestions:
        click.echo(f"Potential matches for {pdf_file}:\n")
        for i, (bib_key, entry, score) in enumerate(suggestions, 1):
            click.echo(f"{i}. {bib_key} (score: {score:.2f})")
            click.echo(f"   Title: {entry.get('title', 'N/A')[:80]}")
            click.echo(f"   Authors: {entry.get('authors', 'N/A')[:80]}")
            click.echo(f"   Year: {entry.get('year', 'N/A')}")
            click.echo()
    else:
        click.echo(f"No potential matches found for {pdf_file}")

@pdf.command('set-markdown')
@click.argument('pdf_file')
@click.argument('markdown_path')
@click.pass_context
def pdf_set_markdown(ctx, pdf_file, markdown_path):
    """Set the markdown_file field for a PDF."""
    manager = ctx.obj['manager']
    if manager.set_markdown_file(pdf_file, markdown_path):
        click.echo(f"Set markdown file for {pdf_file} to {markdown_path}")
    else:
        click.echo(f"Error: PDF {pdf_file} not found in worklist", err=True)

@pdf.command('investigate')
@click.argument('pdf_file')
@click.option('--auto-map', is_flag=True, help='Automatically map if high confidence match found')
@click.option('--threshold', default=0.8, help='Confidence threshold for auto-mapping')
@click.pass_context
def pdf_investigate(ctx, pdf_file, auto_map, threshold):
    """Investigate a PDF and find potential paper matches."""
    manager = ctx.obj['manager']

    # Show PDF info
    pdf_entry = manager.get_entry('pdfs', pdf_file)
    if not pdf_entry:
        click.echo(f"PDF {pdf_file} not found")
        return

    click.echo(f"\n=== Investigating {pdf_file} ===")
    click.echo(f"Status: {pdf_entry['status']}")
    click.echo(f"Has text: {pdf_entry.get('has_text', False)}")

    if not pdf_entry.get('has_text'):
        click.echo("Cannot investigate - no extracted text")
        return

    # Show extract
    text = manager.get_pdf_extract(pdf_file)
    if text:
        click.echo(f"\nFirst 500 characters:")
        click.echo(text[:500])

    # Get suggestions
    suggestions = manager.suggest_matches_for_pdf(pdf_file, 5)

    if suggestions:
        click.echo(f"\n=== Potential Matches ===")
        for i, (bib_key, entry, score) in enumerate(suggestions, 1):
            click.echo(f"\n{i}. {bib_key} (score: {score:.2f})")
            click.echo(f"   Title: {entry.get('title', 'N/A')}")
            click.echo(f"   Authors: {entry.get('authors', 'N/A')[:100]}")
            click.echo(f"   Year: {entry.get('year', 'N/A')}")

        # Auto-map if requested and high confidence
        if auto_map and suggestions[0][2] >= threshold:
            bib_key, _, score = suggestions[0]
            confidence = 'high' if score > 0.9 else 'medium' if score > 0.7 else 'low'
            manager.create_mapping(bib_key, pdf_file, confidence, f"Auto-mapped via PDF investigation, score: {score:.2f}")
            click.echo(f"\n✓ Auto-mapped {pdf_file} to {bib_key} (confidence: {confidence})")
        else:
            click.echo(f"\nBest match score: {suggestions[0][2]:.2f}")
            if suggestions[0][2] >= 0.7:
                click.echo("Recommendation: Review and create mapping with:")
                click.echo(f"  python paper_data_cli.py map create {suggestions[0][0]} {pdf_file}")
    else:
        click.echo("\nNo potential matches found")
        click.echo("Recommendation: Mark as NO_BIBTEX with:")
        click.echo(f"  python paper_data_cli.py status update pdfs {pdf_file} NO_BIBTEX")

@cli.command('export')
@click.option('--output', default='mapping.json', help='Output file path')
@click.pass_context
def export(ctx, output):
    """Export final mappings."""
    manager = ctx.obj['manager']
    count = manager.export_mappings(output)
    click.echo(f"Exported {count} mappings to {output}")

@cli.command('report')
@click.pass_context
def report(ctx):
    """Generate a summary report."""
    manager = ctx.obj['manager']
    stats = manager.get_stats()
    unmapped = manager.get_unmapped()

    click.echo("\n" + "="*60)
    click.echo("WORKLIST MAPPING REPORT")
    click.echo("="*60)

    click.echo(f"\nCreated: {manager.data['metadata']['created']}")
    click.echo(f"Last updated: {manager.data['metadata']['last_updated']}")

    click.echo(f"\n📚 Total items:")
    click.echo(f"  - Paper entries: {stats['total_papers']}")
    click.echo(f"  - PDF files: {stats['total_pdfs']}")

    click.echo(f"\n✅ Progress:")
    click.echo(f"  - Completed mappings: {stats['mapped']}")
    click.echo(f"  - Unmapped papers: {len(unmapped['papers'])}")
    click.echo(f"  - Unmapped PDFs: {len(unmapped['pdfs'])}")

    if stats['mapped'] > 0:
        coverage = (stats['mapped'] / stats['total_papers']) * 100
        click.echo(f"  - Coverage: {coverage:.1f}% of paper entries")

    click.echo("\n📊 Status breakdown:")
    click.echo("  Papers:")
    for status, count in stats['papers_status'].items():
        click.echo(f"    - {status}: {count}")
    click.echo("  PDFs:")
    for status, count in stats['pdf_status'].items():
        click.echo(f"    - {status}: {count}")

    # Find papers that need PDFs
    no_pdf = [k for k, v in manager.data['papers'].items() if v['status'] == 'NO_PDF']
    if no_pdf:
        click.echo(f"\n⚠️  Papers needing PDFs: {len(no_pdf)}")
        for key in no_pdf[:5]:
            entry = manager.data['papers'][key]
            click.echo(f"  - {key}")
            if entry.get('title'):
                click.echo(f"    {entry['title'][:60]}...")

if __name__ == '__main__':
    cli()