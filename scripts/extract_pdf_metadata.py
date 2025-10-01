#!/usr/bin/env python3
"""
Extract first page text from all PDFs in the pdfs/ directory.
Saves results to pdf_extracts.json for LLM-based matching.
"""

import json
import os
from pathlib import Path
import PyPDF2
import pdfplumber
import sys

def extract_with_pypdf2(pdf_path):
    """Extract text using PyPDF2."""
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            if len(reader.pages) > 0:
                first_page = reader.pages[0]
                text = first_page.extract_text()
                return text if text else None
    except Exception as e:
        print(f"  PyPDF2 failed: {e}", file=sys.stderr)
        return None

def extract_with_pdfplumber(pdf_path):
    """Extract text using pdfplumber (better for complex layouts)."""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            if len(pdf.pages) > 0:
                first_page = pdf.pages[0]
                text = first_page.extract_text()
                return text if text else None
    except Exception as e:
        print(f"  pdfplumber failed: {e}", file=sys.stderr)
        return None

def extract_first_page(pdf_path):
    """Try multiple methods to extract first page text."""
    print(f"Processing: {pdf_path.name}")

    # Try pdfplumber first (generally better)
    text = extract_with_pdfplumber(pdf_path)

    # Fallback to PyPDF2
    if not text or len(text.strip()) < 100:
        pypdf_text = extract_with_pypdf2(pdf_path)
        if pypdf_text and len(pypdf_text.strip()) > len(text.strip() if text else ""):
            text = pypdf_text

    if text:
        # Clean up the text a bit
        text = text.strip()
        # Limit to first 5000 chars (should be plenty for title/authors)
        text = text[:5000]

    return text

def main():
    pdfs_dir = Path("pdfs")
    if not pdfs_dir.exists():
        print(f"Error: {pdfs_dir} directory not found", file=sys.stderr)
        sys.exit(1)

    pdf_files = sorted(pdfs_dir.glob("*.pdf"))
    print(f"Found {len(pdf_files)} PDF files")

    extracts = {}
    failed = []

    for pdf_path in pdf_files:
        text = extract_first_page(pdf_path)

        if text:
            extracts[pdf_path.name] = {
                "text": text,
                "length": len(text)
            }
        else:
            failed.append(pdf_path.name)
            extracts[pdf_path.name] = {
                "text": None,
                "error": "Could not extract text"
            }

    # Save results
    output_file = "pdf_extracts.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(extracts, f, indent=2, ensure_ascii=False)

    print(f"\nResults saved to {output_file}")
    print(f"Successfully extracted: {len(pdf_files) - len(failed)} PDFs")
    if failed:
        print(f"Failed to extract: {len(failed)} PDFs")
        for name in failed[:10]:  # Show first 10 failures
            print(f"  - {name}")
        if len(failed) > 10:
            print(f"  ... and {len(failed) - 10} more")

if __name__ == "__main__":
    main()