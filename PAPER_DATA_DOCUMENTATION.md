# Paper Data Documentation

This document describes the schema of `paper_data.json` and the usage of `paper_data_cli.py`.

## Paper Data Schema (`paper_data.json`)

The `paper_data.json` file contains structured information about academic papers, their PDFs, and the mappings between them.

### Top-Level Structure

```json
{
  "metadata": { ... },
  "bibtex": { ... },
  "pdfs": { ... },
  "mappings": [ ... ]
}
```

### `metadata` Object

Contains metadata about the paper data file itself.

**Fields:**
- `created` (string): ISO timestamp when the file was created
- `last_updated` (string): ISO timestamp of last update
- `total_bibtex` (number): Count of bibtex entries
- `total_pdfs` (number): Count of PDF files
- `mapped_count` (number): Count of mappings between bibtex and PDFs
- `status_legend` (object): Explanations of status values

**Example:**
```json
{
  "metadata": {
    "created": "2025-10-01 09:38:35",
    "last_updated": "2025-10-01 14:46:45",
    "total_bibtex": 114,
    "total_pdfs": 99,
    "mapped_count": 117,
    "status_legend": {
      "NOT_INVESTIGATED": "Initial state - not yet examined",
      "INVESTIGATING": "Currently being examined",
      "MAPPED": "Successfully matched to a PDF/bib entry",
      "NO_PDF": "Investigated, no matching PDF found",
      "NO_BIBTEX": "PDF exists but no matching bib entry",
      "MULTIPLE_CANDIDATES": "Ambiguous, needs human review"
    }
  }
}
```

### `bibtex` Object

Dictionary mapping bibtex keys to bibtex entry information.

**Key:** Bibtex citation key (e.g., `"DBLP:journals/cacm/LahiriSBMC25"`)

**Entry Fields:**

#### Core Bibtex Fields
- `type` (string): Entry type (article, inproceedings, misc, etc.)
- `title` (string): Paper title
- `authors` (string): Author names (separated by " and ")
- `year` (string): Publication year
- `journal` (string, optional): Journal name (for articles)
- `booktitle` (string, optional): Book/conference title (for inproceedings)
- `volume` (string, optional): Volume number
- `number` (string, optional): Issue number
- `pages` (string, optional): Page range
- `doi` (string, optional): DOI
- `url` (string, optional): URL
- `note` (string, optional): Additional notes
- `publisher` (string, optional): Publisher name
- `series` (string, optional): Series name
- `editor` (string, optional): Editor names
- `edition` (string, optional): Edition number
- `address` (string, optional): Publication address
- `school` (string, optional): School name (for theses)
- `institution` (string, optional): Institution name (for tech reports)

#### Mapping & Status Fields
- `status` (string): Current status (see metadata.status_legend)
- `mapped_pdf` (string, optional): Filename of mapped PDF
- `notes` (string, optional): Manual notes about this entry
- `found_pdf` (boolean, optional): Whether PDF was newly found
- `found_date` (string, optional): Timestamp when PDF was found

#### Extracted Information
- `extracted_paper_info` (object, optional): Structured summary from LLM
  - `tldr` (string): One-sentence summary
  - `details` (object):
    - `topic` (string): Main research area
    - `problem` (string): Core research problem
    - `approach` (string): Methods used
    - `key_insights` (array of strings): Main findings
    - `implications` (string): Why the work matters

#### Additional Fields
- `tags` (array of strings, optional): Topic and method tags
- `raw_bibtex` (string, optional): Original bibtex entry text
- `under_submission` (boolean, optional): Whether paper is under submission

**Example:**
```json
{
  "DBLP:journals/cacm/LahiriSBMC25": {
    "status": "MAPPED",
    "type": "article",
    "title": "Program Merge: What's Deep Learning Got to Do with It?",
    "authors": "Shuvendu K. Lahiri and Alexey Svyatkovskiy and Christian Bird and Erik Miejer and Terry Coatta",
    "year": "2025",
    "journal": "Communications of the ACM",
    "mapped_pdf": "program_merge_cacm.pdf",
    "found_pdf": true,
    "found_date": "2025-10-01 12:04:51",
    "extracted_paper_info": {
      "tldr": "Applies token-level deep-learning models to suggest merge conflict resolutions.",
      "details": {
        "topic": "Machine learning for program merge conflict resolution",
        "problem": "Merge conflicts are time-consuming and error-prone...",
        "approach": "Mined conflicts from GitHub, trained transformer models...",
        "key_insights": [
          "Token-level representation is crucial...",
          "Most merges pick one side..."
        ],
        "implications": "ML can assist in resolving complex merge conflicts..."
      }
    },
    "tags": ["ai-for-software-engineering", "version-control"],
    "raw_bibtex": "@article{lahiri2025...,\n  author = {...},\n  ...\n}"
  }
}
```

### `pdfs` Object

Dictionary mapping PDF filenames to PDF information.

**Key:** PDF filename (e.g., `"program_merge_cacm.pdf"`)

**Entry Fields:**
- `status` (string): Current status (see metadata.status_legend)
- `mapped_bibtex` (string, optional): Bibtex key this PDF is mapped to
- `has_text` (boolean): Whether text extraction was successful
- `markdown_file` (string, optional): Path to generated markdown file
- `newly_found` (boolean, optional): Whether this PDF was newly discovered
- `found_date` (string, optional): Timestamp when PDF was found

**Example:**
```json
{
  "program_merge_cacm.pdf": {
    "status": "MAPPED",
    "mapped_bibtex": "DBLP:journals/cacm/LahiriSBMC25",
    "has_text": true,
    "markdown_file": "markdowns/program_merge_cacm.md"
  }
}
```

### `mappings` Array

List of verified mappings between bibtex entries and PDFs.

**Entry Fields:**
- `bib_key` (string): Bibtex citation key
- `pdf_file` (string): PDF filename
- `confidence` (string): Confidence level (low, medium, high, auto-high)
- `verified_date` (string): ISO timestamp when mapping was verified
- `notes` (string, optional): Manual notes
- `found` (boolean, optional): Whether this was a newly found mapping

**Example:**
```json
{
  "mappings": [
    {
      "bib_key": "DBLP:journals/cacm/LahiriSBMC25",
      "pdf_file": "program_merge_cacm.pdf",
      "confidence": "high",
      "verified_date": "2025-10-01 12:04:51"
    }
  ]
}
```

---

## Paper Data CLI (`paper_data_cli.py`)

Command-line interface for managing paper data.

### Basic Usage

```bash
python paper_data_cli.py [COMMAND] [SUBCOMMAND] [OPTIONS] [ARGUMENTS]
```

### Command Groups

#### `bibtex` - Bibtex Entry Management

**List bibtex entries with markdown:**
```bash
python paper_data_cli.py bibtex list-with-markdown [--status STATUS]
```
- Lists bibtex entries that have associated markdown files
- Default status: MAPPED

**Get bibtex key by PDF stem:**
```bash
python paper_data_cli.py bibtex get-by-pdf-stem <pdf_stem>
```
- Finds bibtex key for a PDF by its filename (without extension)
- Example: `python paper_data_cli.py bibtex get-by-pdf-stem program_merge_cacm`

**Set extracted paper info:**
```bash
python paper_data_cli.py bibtex set-extracted-info <bib_key> <json_file>
```
- Sets the extracted_paper_info field from a JSON file
- Used by paper processing pipeline

**Set raw bibtex:**
```bash
python paper_data_cli.py bibtex set-raw-bibtex <bib_key> <bibtex_file>
```
- Sets the raw_bibtex field from a file
- Preserves original bibtex formatting

**Set under submission:**
```bash
python paper_data_cli.py bibtex set-under-submission <bib_key> <true|false>
```
- Marks a paper as under submission
- Example: `python paper_data_cli.py bibtex set-under-submission Miller2026MaybeWe true`

#### `status` - Status Management

**Update status:**
```bash
python paper_data_cli.py status update <item_type> <key> <new_status>
```
- `item_type`: bibtex or pdfs
- `new_status`: NOT_INVESTIGATED, INVESTIGATING, MAPPED, NO_PDF, NO_BIBTEX, MULTIPLE_CANDIDATES
- Example: `python paper_data_cli.py status update bibtex Smith2024ML MAPPED`

**Get status:**
```bash
python paper_data_cli.py status get <item_type> <key>
```
- Displays the current status of an item

#### `next` - Get Next Items

**Get next uninvestigated:**
```bash
python paper_data_cli.py next uninvestigated <item_type>
```
- Returns the next NOT_INVESTIGATED item
- Useful for manual processing workflows

**Get next by status:**
```bash
python paper_data_cli.py next by-status <item_type> <status>
```
- Returns the next item with a specific status

#### `list` - List Items

**List items:**
```bash
python paper_data_cli.py list <item_type> [--status STATUS] [--limit N]
```
- Lists keys, optionally filtered by status
- Example: `python paper_data_cli.py list bibtex --status MAPPED --limit 10`

#### `get` - Get Entry Details

**Get entry:**
```bash
python paper_data_cli.py get <item_type> <key>
```
- Returns full JSON details of an entry
- Example: `python paper_data_cli.py get bibtex Smith2024ML`

#### `delete` - Delete Entry

**Delete entry:**
```bash
python paper_data_cli.py delete <item_type> <key>
```
- Completely removes an entry and its mappings
- Use with caution!

#### `map` - Mapping Management

**Create mapping:**
```bash
python paper_data_cli.py map create <bib_key> <pdf_file> [--confidence LEVEL] [--notes TEXT] [--found]
```
- `--confidence`: low, medium, high, auto-high (default: high)
- `--notes`: Additional notes
- `--found`: Mark as newly found PDF
- Example: `python paper_data_cli.py map create Smith2024ML smith2024.pdf --confidence high`

**Remove mapping:**
```bash
python paper_data_cli.py map remove <bib_key>
```
- Removes mapping and resets both bibtex and PDF to NOT_INVESTIGATED

**Auto-map obvious matches:**
```bash
python paper_data_cli.py map auto
```
- Automatically maps PDFs based on filename patterns and content matching
- Uses author name + year heuristics

#### `search` - Search Entries

**Search by field:**
```bash
python paper_data_cli.py search <item_type> <field> <query>
```
- Searches for entries where field contains query (case-insensitive)
- Example: `python paper_data_cli.py search bibtex title "machine learning"`

#### `similar` - Find Similar Entries

**Find similar:**
```bash
python paper_data_cli.py similar <item_type> <key>
```
- Finds potentially similar entries (useful for detecting duplicates)
- Uses title and author similarity

#### `tags` - Tag Management

**Add tags:**
```bash
python paper_data_cli.py tags add <item_type> <key> <tag1> [tag2 tag3 ...]
```
- Adds tags (avoids duplicates)
- Example: `python paper_data_cli.py tags add bibtex Smith2024ML machine-learning surveys`

**Remove tags:**
```bash
python paper_data_cli.py tags remove <item_type> <key> <tag1> [tag2 ...]
```
- Removes specified tags

**Set tags:**
```bash
python paper_data_cli.py tags set <item_type> <key> <tag1> [tag2 ...]
```
- Replaces all existing tags
- Example: `python paper_data_cli.py tags set bibtex Smith2024ML ai-tools interviews`

**Get tags:**
```bash
python paper_data_cli.py tags get <item_type> <key>
```
- Displays tags for an item

**List by tag:**
```bash
python paper_data_cli.py tags list <item_type> <tag>
```
- Lists all items with a specific tag
- Example: `python paper_data_cli.py tags list bibtex machine-learning`

**Rename tag:**
```bash
python paper_data_cli.py tags rename <item_type> <old_tag> <new_tag>
```
- Renames a tag across all items
- Example: `python paper_data_cli.py tags rename bibtex social-network-analysis network-analysis`

#### `pdf` - PDF-Specific Operations

**Set markdown file:**
```bash
python paper_data_cli.py pdf set-markdown <pdf_file> <markdown_path>
```
- Associates a markdown file with a PDF
- Example: `python paper_data_cli.py pdf set-markdown smith2024.pdf markdowns/smith2024.md`

**Show PDF extract:**
```bash
python paper_data_cli.py pdf extract <pdf_file> [--limit N]
```
- Displays extracted text from a PDF
- Default limit: 500 characters

**Suggest matches:**
```bash
python paper_data_cli.py pdf suggest <pdf_file> [--max N]
```
- Suggests potential bibtex matches for a PDF
- Uses text analysis and metadata matching

**Investigate PDF:**
```bash
python paper_data_cli.py pdf investigate <pdf_file> [--auto-map] [--threshold SCORE]
```
- Shows PDF info, extracted text, and potential matches
- `--auto-map`: Automatically create mapping if confidence is high
- `--threshold`: Confidence threshold for auto-mapping (default: 0.8)

#### `stats` - Statistics

**Show statistics:**
```bash
python paper_data_cli.py stats
```
- Displays overall statistics about the paper data

#### `unmapped` - Show Unmapped Items

**Show unmapped:**
```bash
python paper_data_cli.py unmapped
```
- Shows counts and lists of unmapped bibtex entries and PDFs
- Interactive prompts to show details

#### `export` - Export Mappings

**Export mappings:**
```bash
python paper_data_cli.py export [--output FILE]
```
- Exports final mappings to JSON
- Default output: mapping.json
- Includes NO_PDF entries with null PDF value

#### `report` - Generate Report

**Generate report:**
```bash
python paper_data_cli.py report
```
- Generates a comprehensive summary report
- Shows statistics, status breakdown, and papers needing PDFs

---

## Common Workflows

### Adding a New Paper

1. Add bibtex entry to `filtered.bib`
2. Run cleanup script: `python scripts/cleanup_bibtex_worklist.py`
3. If you have the PDF, map it: `python paper_data_cli.py map create <bib_key> <pdf_file>`
4. Set under_submission if needed: `python paper_data_cli.py bibtex set-under-submission <bib_key> true`

### Processing a New PDF

1. Place PDF in `pdfs/` directory
2. Generate markdown: `python scripts/generate_markdown.py pdfs/<file>.pdf markdowns/<file>.md`
3. Find or create bibtex entry and map: `python paper_data_cli.py map create <bib_key> <pdf_file>`
4. Extract paper info: `python scripts/extract_paper_info.py markdowns/<file>.md paper_info_json/<file>.json`
5. Add tags: `python paper_data_cli.py tags add bibtex <bib_key> tag1 tag2`

### Updating Bibtex Data

1. Edit `filtered.bib`
2. Run: `python scripts/cleanup_bibtex_worklist.py`
3. Review changes in output
4. Replace `paper_data.json` with `paper_data-updated.json` if satisfied

### Batch Operations

Process all mapped PDFs to markdown:
```bash
python scripts/process_mapped_pdfs_to_markdown.py
```

Extract info for all papers:
```bash
python scripts/process_papers_extract_info.py
```

Generate tag taxonomy:
```bash
python scripts/manage_tags.py generate
```

Assign tags to all papers:
```bash
python scripts/manage_tags.py assign
```
