# /// script
# dependencies = []
# requires-python = ">=3.11"
# ///
"""
Batch PDF extraction: runs extract.py on all papers that have a mapped PDF.

Usage:
    uv run scripts/batch_extract.py [--dry-run] [--parallel 3] [--skip-existing]

Reads paper_data.json, finds PDFs in site/pdfs/, runs the extraction script
for each paper, outputting to extracted/{paper_id}/.
"""

import argparse
import json
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAPER_DATA = ROOT / "site" / "paper_data.json"
PDF_DIR = ROOT / "site" / "pdfs"
OUTPUT_DIR = ROOT / "extracted"
EXTRACT_SCRIPT = Path.home() / "side_projects" / "pdf_extraction" / "extract.py"


def safe_dirname(paper_id):
    """Sanitize paper ID for use as a directory name."""
    return paper_id.replace("/", "_").replace(":", "_").replace(" ", "_")


def main():
    parser = argparse.ArgumentParser(description="Batch extract PDFs to markdown")
    parser.add_argument("--dry-run", action="store_true", help="Show what would be done without running")
    parser.add_argument("--parallel", "-j", type=int, default=20, help="Parallelism passed to extract.py (default: 20)")
    parser.add_argument("--force", action="store_true", help="Re-extract even if combined.md already exists")
    parser.add_argument("--papers", type=str, default=None, help="Comma-separated paper IDs to process (default: all)")
    args = parser.parse_args()

    with open(PAPER_DATA) as f:
        data = json.load(f)

    papers = []
    for pid, p in data["papers"].items():
        pdf_name = p.get("mapped_pdf", "")
        if not pdf_name:
            continue
        pdf_path = PDF_DIR / pdf_name
        if not pdf_path.exists():
            continue
        papers.append((pid, p, pdf_path))

    if args.papers:
        allowed = set(args.papers.split(","))
        papers = [(pid, p, path) for pid, p, path in papers if pid in allowed]

    papers.sort(key=lambda x: x[1].get("year", 0), reverse=True)

    print(f"Found {len(papers)} papers with PDFs")
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    skipped = 0
    processed = 0
    failed = 0
    total_time = 0

    for i, (pid, p, pdf_path) in enumerate(papers, 1):
        dirname = safe_dirname(pid)
        out_dir = OUTPUT_DIR / dirname
        combined = out_dir / "combined.md"

        if not args.force and combined.exists():
            skipped += 1
            continue

        title = p.get("title", pid)[:60]
        print(f"\n[{i}/{len(papers)}] {pid}")
        print(f"  Title: {title}")
        print(f"  PDF:   {pdf_path.name}")
        print(f"  Out:   {out_dir}/")

        if args.dry_run:
            continue

        out_dir.mkdir(parents=True, exist_ok=True)

        cmd = [
            "uv", "run", str(EXTRACT_SCRIPT),
            str(pdf_path),
            "-o", str(out_dir),
            "-j", str(args.parallel),
        ]

        start = time.time()
        try:
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=600,  # 10 min per paper
                cwd=str(EXTRACT_SCRIPT.parent),
            )
            elapsed = time.time() - start
            total_time += elapsed

            if result.returncode != 0:
                print(f"  FAILED ({elapsed:.1f}s)")
                print(f"  stderr: {result.stderr[-200:]}")
                failed += 1
                # Write error log
                (out_dir / "batch_error.log").write_text(result.stderr)
            else:
                processed += 1
                print(f"  OK ({elapsed:.1f}s)")
        except subprocess.TimeoutExpired:
            print(f"  TIMEOUT (>600s)")
            failed += 1
        except Exception as e:
            print(f"  ERROR: {e}")
            failed += 1

    print(f"\n--- Summary ---")
    print(f"Total:     {len(papers)}")
    print(f"Processed: {processed}")
    print(f"Skipped:   {skipped}")
    print(f"Failed:    {failed}")
    if total_time > 0:
        print(f"Time:      {total_time:.0f}s ({total_time/60:.1f}m)")
    if processed > 0:
        print(f"Avg:       {total_time/processed:.1f}s per paper")


if __name__ == "__main__":
    main()
