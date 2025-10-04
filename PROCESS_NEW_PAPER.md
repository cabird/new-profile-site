# Adding a New Paper to the System

This guide documents the process for adding a new paper (PDF + bibtex entry) to the paper management system.

## Quick Summary

```bash
# From repo root, with paper.pdf and paper.bib ready:
python paper_data_cli.py paper add {key} --bibtex-file {key}.bib
python paper_data_cli.py pdf add {key}.pdf
python paper_data_cli.py map create {key} {key}.pdf
cd scripts && python generate_markdown.py ../{key}.pdf ../markdowns/{key}.md && cd ..
python paper_data_cli.py pdf set-markdown {key}.pdf markdowns/{key}.md
cd scripts && python extract_paper_info.py ../markdowns/{key}.md ../paper_info_json/{key}.json && cd ..
python paper_data_cli.py paper set-extracted-info {key} paper_info_json/{key}.json
python scripts/manage_tags.py assign --paper {key}
python paper_data_cli.py get papers {key}  # Verify
```

## Overview

Adding a paper involves several steps:
1. Obtain the PDF (download or have it ready)
2. Get the bibtex citation
3. Add entries to the system
4. Generate markdown from the PDF
5. Extract structured information
6. Assign tags

## Prerequisites

- GROBID service running on `localhost:8070` (for PDF → markdown conversion)
- OpenAI API key in `.env` file
- Python virtual environment activated (with bibtexparser installed)
- Tag taxonomy file exists at repo root (`tags_taxonomy.json`)
  - If missing, run: `python scripts/manage_tags.py generate`

## Important Notes

- **Always run commands from the repository root** unless specified otherwise
- **Naming consistency**: Use the same base name for paper key and PDF file when possible
- **Directory structure**: PDFs can be in repo root or `pdfs/` directory

## Step-by-Step Process

### 1. Choose a Naming Convention

Use a consistent naming scheme for both the paper key and PDF filename:
- Format: `{first_author}{year}{keyword}` (e.g., `dearstyne2026revealing`)
- The paper key will be taken from the bibtex entry's citation key
- Try to match the PDF filename to the bibtex key for consistency
- If they differ, the system will handle it through the mapping step

### 2. Obtain the PDF

Place the PDF in the repository root or `pdfs/` directory:

```bash
# If downloading from arXiv:
wget -O pdfs/{name}.pdf https://arxiv.org/pdf/{arxiv_id}.pdf

# Or if you have the PDF already, just ensure it's named consistently:
# {name}.pdf where {name} matches your intended paper key
```

### 3. Get the Bibtex Citation

Save the bibtex to a file (can be temporary or permanent):

```bash
# From arXiv - fetch bibtex from https://arxiv.org/bibtex/{arxiv_id}
# From DBLP - copy from website
# From other sources - export as bibtex

# Option 1: Save to a .bib file
cat > {name}.bib << 'EOF'
@misc{name2024title,
  title={...},
  author={...},
  year={2024},
  ...
}
EOF

# Option 2: Save to temp file
cat > temp_bibtex.txt << 'EOF'
@misc{name2024title,
  title={...},
  author={...},
  year={2024},
  ...
}
EOF
```

**Note**: The bibtex key (e.g., `name2024title`) will be used as the paper key in the system.

### 4. Add Paper Entry

```bash
python paper_data_cli.py paper add {bib_key} \
  --bibtex-file temp_bibtex.txt \
  --under-submission  # Optional: for papers under submission
```

**Example:**
```bash
python paper_data_cli.py paper add pimenova2025vibe \
  --bibtex-file temp_bibtex.txt \
  --under-submission
```

### 5. Add PDF Entry

```bash
python paper_data_cli.py pdf add {pdf_file}.pdf
```

**Example:**
```bash
python paper_data_cli.py pdf add pimenova2025vibe.pdf
```

**Note**: Add `--has-text` flag if the PDF has selectable text (most modern PDFs do).

### 6. Create Mapping

```bash
python paper_data_cli.py map create {bib_key} {pdf_file}.pdf --confidence high
```

**Example:**
```bash
python paper_data_cli.py map create pimenova2025vibe pimenova2025vibe.pdf --confidence high
```

### 7. Generate Markdown from PDF

**Run from the `scripts/` directory:**

```bash
cd scripts
# If PDF is in pdfs/ directory:
python generate_markdown.py ../pdfs/{pdf_file}.pdf ../markdowns/{name}.md

# If PDF is in repo root:
python generate_markdown.py ../{pdf_file}.pdf ../markdowns/{name}.md
cd ..
```

**Example:**
```bash
cd scripts
python generate_markdown.py ../pimenova2025vibe.pdf ../markdowns/pimenova2025vibe.md
cd ..
```

Then set the markdown path:

```bash
python paper_data_cli.py pdf set-markdown {pdf_file}.pdf markdowns/{name}.md
```

**Example:**
```bash
python paper_data_cli.py pdf set-markdown pimenova2025vibe.pdf markdowns/pimenova2025vibe.md
```

### 8. Extract Paper Information

**Run from the `scripts/` directory:**

```bash
cd scripts
python extract_paper_info.py ../markdowns/{name}.md ../paper_info_json/{name}.json
cd ..
```

**Example:**
```bash
cd scripts
python extract_paper_info.py ../markdowns/pimenova2025vibe.md ../paper_info_json/pimenova2025vibe.json
cd ..
```

Then update the paper entry:

```bash
python paper_data_cli.py paper set-extracted-info {bib_key} paper_info_json/{name}.json
```

**Example:**
```bash
python paper_data_cli.py paper set-extracted-info pimenova2025vibe paper_info_json/pimenova2025vibe.json
```

### 9. Assign Tags

Two options for tag assignment:

#### Option A: Automatic LLM-based tag assignment (Recommended)

```bash
# For a single paper:
python scripts/manage_tags.py assign --paper {bib_key}

# For all papers (batch):
python scripts/manage_tags.py assign
```

**Example:**
```bash
python scripts/manage_tags.py assign --paper pimenova2025vibe
```

#### Option B: Manual tag assignment

```bash
# View the paper summary
python paper_data_cli.py get papers {bib_key}

# View available tags
cat tags_taxonomy.json | python -m json.tool | grep '"tag"'

# Manually assign tags
python paper_data_cli.py tags set papers {bib_key} {tag1} {tag2} {tag3} ...
```

**Example:**
```bash
python paper_data_cli.py tags set papers pimenova2025vibe \
  interviews \
  ai-assisted-programming \
  developer-productivity \
  tool-adoption-and-trust
```

### 10. Verify

Check that everything was added correctly:

```bash
python paper_data_cli.py get papers {bib_key}
```

## Batch Processing

If you have multiple papers to add, you can use the batch scripts:

### Batch Markdown Generation

```bash
cd scripts
python process_mapped_pdfs_to_markdown.py --pdfs-dir ../pdfs --markdowns-dir ../markdowns
cd ..
```

### Batch Information Extraction

```bash
cd scripts
python process_papers_extract_info.py
cd ..
```

### Batch Tag Assignment

```bash
# Run from repo root:
python scripts/manage_tags.py assign
```

## Common Issues

### GROBID Not Running

If markdown generation fails, make sure GROBID is running:

```bash
# Check if GROBID is running
curl http://localhost:8070/api/isalive

# If not, start GROBID (adjust path as needed)
# See GROBID documentation for installation
```

### Script Path Issues

Scripts in the `scripts/` directory use relative paths and expect to be run from within that directory or from the repo root. If you get path errors:

- For individual operations: `cd scripts` first
- For CLI operations: run from repo root
- For manage_tags.py: Always run from repo root (`python scripts/manage_tags.py`)

### Missing Dependencies

If you get `No module named 'bibtexparser'`:
```bash
pip install bibtexparser
```

### Tag Assignment Issues

If tag assignment fails with "No paper key found":
- Check that the paper was added correctly with `python paper_data_cli.py list papers`
- The paper key might differ from the PDF filename
- Use `python paper_data_cli.py get papers {key}` to verify the mapping

### OpenAI API Issues

Make sure your `.env` file has valid credentials:

```bash
OPENAI_API_KEY=your-key-here
OPENAI_MODEL=gpt-4o-mini
OPENAI_TAG_GENERATION_MODEL=gpt-4o-mini
OPENAI_TAG_ASSIGNMENT_MODEL=gpt-4o-mini
```

## Quick Reference

### Full Example (dearstyne2026revealing)

```bash
# 1. Have PDF and bibtex ready
# dearstyne2026revealing.pdf and dearstyne2026revealing.bib in repo root

# 2. Add to system
python paper_data_cli.py paper add dearstyne2026revealing --bibtex-file dearstyne2026revealing.bib --under-submission
python paper_data_cli.py pdf add dearstyne2026revealing.pdf
python paper_data_cli.py map create dearstyne2026revealing dearstyne2026revealing.pdf

# 3. Generate markdown
cd scripts
python generate_markdown.py ../dearstyne2026revealing.pdf ../markdowns/dearstyne2026revealing.md
cd ..
python paper_data_cli.py pdf set-markdown dearstyne2026revealing.pdf markdowns/dearstyne2026revealing.md

# 4. Extract info
cd scripts
python extract_paper_info.py ../markdowns/dearstyne2026revealing.md ../paper_info_json/dearstyne2026revealing.json
cd ..
python paper_data_cli.py paper set-extracted-info dearstyne2026revealing paper_info_json/dearstyne2026revealing.json

# 5. Assign tags (automatic)
python scripts/manage_tags.py assign --paper dearstyne2026revealing

# 6. Verify
python paper_data_cli.py get papers dearstyne2026revealing
```

## Lessons Learned

Based on real-world usage, here are key insights:

1. **Virtual Environment**: Always ensure your venv is activated with bibtexparser installed
2. **Working Directory**: Run all commands from repo root to avoid path issues
3. **File Placement**: PDFs and bibtex files can be in repo root or subdirectories
4. **Paper Keys**: The bibtex citation key becomes the paper key - choose wisely
5. **Tag Assignment**: Use the `--paper` flag for single papers to avoid processing all papers
6. **Script Paths**: The `manage_tags.py` script has been updated to work correctly from repo root
7. **PDF Flags**: The `--has-text` flag for PDFs is optional for modern PDFs

## Future Improvements

Consider creating a wrapper script (`scripts/add_paper.py`) that automates these steps:

```bash
# Proposed simplified workflow
python scripts/add_paper.py \
  --name dearstyne2026revealing \
  --pdf-path dearstyne2026revealing.pdf \
  --bibtex-file dearstyne2026revealing.bib \
  --under-submission
```

This would handle all the directory changes and intermediate steps automatically.
