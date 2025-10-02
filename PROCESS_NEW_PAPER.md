# Adding a New Paper to the System

This guide documents the process for adding a new paper (PDF + bibtex entry) to the paper management system.

## Overview

Adding a paper involves several steps:
1. Download the PDF
2. Get the bibtex citation
3. Add entries to the system
4. Generate markdown from the PDF
5. Extract structured information
6. Assign tags

## Prerequisites

- GROBID service running on `localhost:8070` (for PDF → markdown conversion)
- OpenAI API key in `.env` file
- Python virtual environment activated

## Step-by-Step Process

### 1. Choose a Naming Convention

Use a consistent naming scheme for both the paper key and PDF filename:
- Format: `{first_author}{year}{keyword}` (e.g., `pimenova2025vibe`)
- Use the same name for both paper key and PDF file

### 2. Download the PDF

```bash
# Example: Download from arXiv
wget -O pdfs/{name}.pdf https://arxiv.org/pdf/{arxiv_id}.pdf

# Example: pimenova2025vibe
wget -O pdfs/pimenova2025vibe.pdf https://arxiv.org/pdf/2509.12491.pdf
```

### 3. Get the Bibtex Citation

Save the raw bibtex to a temporary file:

```bash
# From arXiv - fetch bibtex from https://arxiv.org/bibtex/{arxiv_id}
# From DBLP - copy from website
# From other sources - export as bibtex

# Save to temp file
cat > temp_bibtex.txt << 'EOF'
@misc{pimenova2025vibe,
  title={...},
  author={...},
  year={2025},
  ...
}
EOF
```

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
python paper_data_cli.py pdf add {pdf_file}.pdf --has-text
```

**Example:**
```bash
python paper_data_cli.py pdf add pimenova2025vibe.pdf --has-text
```

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
python generate_markdown.py ../pdfs/{pdf_file}.pdf ../markdowns/{name}.md
cd ..
```

**Example:**
```bash
cd scripts
python generate_markdown.py ../pdfs/pimenova2025vibe.pdf ../markdowns/pimenova2025vibe.md
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

Review the extracted paper info and tag taxonomy, then assign appropriate tags:

```bash
# View the paper summary
python paper_data_cli.py get papers {bib_key}

# View available tags
cat tags_taxonomy.json | jq '.[].tag'

# Assign tags
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
cd scripts
python manage_tags.py assign
cd ..
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

### OpenAI API Issues

Make sure your `.env` file has valid credentials:

```bash
OPENAI_API_KEY=your-key-here
OPENAI_MODEL=gpt-4o-mini
OPENAI_TAG_GENERATION_MODEL=gpt-4o-mini
OPENAI_TAG_ASSIGNMENT_MODEL=gpt-4o-mini
```

## Quick Reference

### Full Example (pimenova2025vibe)

```bash
# 1. Download PDF
wget -O pdfs/pimenova2025vibe.pdf https://arxiv.org/pdf/2509.12491.pdf

# 2. Save bibtex to temp file (omitted for brevity)

# 3. Add to system
python paper_data_cli.py paper add pimenova2025vibe --bibtex-file temp_bibtex.txt --under-submission
python paper_data_cli.py pdf add pimenova2025vibe.pdf --has-text
python paper_data_cli.py map create pimenova2025vibe pimenova2025vibe.pdf --confidence high

# 4. Generate markdown
cd scripts
python generate_markdown.py ../pdfs/pimenova2025vibe.pdf ../markdowns/pimenova2025vibe.md
cd ..
python paper_data_cli.py pdf set-markdown pimenova2025vibe.pdf markdowns/pimenova2025vibe.md

# 5. Extract info
cd scripts
python extract_paper_info.py ../markdowns/pimenova2025vibe.md ../paper_info_json/pimenova2025vibe.json
cd ..
python paper_data_cli.py paper set-extracted-info pimenova2025vibe paper_info_json/pimenova2025vibe.json

# 6. Assign tags
python paper_data_cli.py tags set papers pimenova2025vibe interviews ai-assisted-programming developer-productivity tool-adoption-and-trust

# 7. Verify
python paper_data_cli.py get papers pimenova2025vibe
```

## Future Improvements

Consider creating a wrapper script (`scripts/add_paper.py`) that automates these steps:

```bash
# Proposed simplified workflow
python scripts/add_paper.py \
  --name pimenova2025vibe \
  --pdf-url https://arxiv.org/pdf/2509.12491.pdf \
  --bibtex-file temp_bibtex.txt \
  --under-submission
```

This would handle all the directory changes and intermediate steps automatically.
