#!/usr/bin/env python3
"""
Convert GROBID TEI XML -> Markdown.

Features
- Title + Abstract
- Section hierarchy (div/head nesting -> #/##/###)
- Paragraphs
- Figure and table captions
- References list
- Optional inline citation replacement: [N] -> (Surname, "Title")
  (Works when body <ref type="bibr" target="#bXX"> links to <biblStruct xml:id="bXX">)

Usage:
  python tei_to_markdown.py INPUT.tei.xml OUTPUT.md [--inline-citations author-title] [--max-level 3] [--omit-references]

Examples:
  python tei_to_markdown.py paper.tei.xml paper.md
  python tei_to_markdown.py paper.tei.xml paper.md --inline-citations author-title
  python tei_to_markdown.py paper.tei.xml paper.md --omit-references
"""

import argparse
import re
from lxml import etree

NS = {"t": "http://www.tei-c.org/ns/1.0"}

def norm_space(s: str) -> str:
    return re.sub(r"\s+", " ", (s or "")).strip()

def get_text(node) -> str:
    """All descendant text normalized."""
    return norm_space("".join(node.itertext()))

def build_biblio_map(doc):
    """
    Build a map from reference xml:id -> dict with 'surname', 'title', 'full'
    """
    refmap = {}
    for bibl in doc.xpath("//t:back//t:listBibl//t:biblStruct", namespaces=NS):
        bid = bibl.get("{http://www.w3.org/XML/1998/namespace}id")
        if not bid:
            continue

        # Try analytic (article) title first, then monogr (book/conference)
        title = bibl.xpath("string(.//t:analytic//t:title)", namespaces=NS).strip()
        if not title:
            title = bibl.xpath("string(.//t:monogr//t:title)", namespaces=NS).strip()

        # First author surname (prefer analytic authors, then monogr)
        surname = bibl.xpath("string(.//t:analytic//t:author[1]//t:persName//t:surname)", namespaces=NS).strip()
        if not surname:
            surname = bibl.xpath("string(.//t:monogr//t:author[1]//t:persName//t:surname)", namespaces=NS).strip()
        if not surname:
            # Sometimes orgName is present; fall back to that
            surname = bibl.xpath("string(.//t:author[1]//t:orgName)", namespaces=NS).strip()

        full = norm_space(" ".join(bibl.xpath(".//text()", namespaces=NS)))
        refmap[bid] = {
            "surname": surname or "Unknown",
            "title": title or "Untitled",
            "full": full
        }
    return refmap

def cite_string(bid, refmap, style):
    info = refmap.get(bid)
    if not info:
        return "[?]"
    if style == "author-title":
        # (Surname, "Title")
        t = info["title"]
        s = info["surname"]
        # quote the title; keep it brief if extremely long
        if len(t) > 180:
            t = t[:177] + "."
        return f'({s}, "{t}")'
    # fallback just in case
    return f'({info.get("surname","Unknown")}, "{info.get("title","Untitled")}")'

def para_text_with_inline_cites(element, refmap, style, omit_citations=False):
    """
    Walk an element and produce text, replacing <ref type="bibr" target="#..."> nodes inline.
    If omit_citations is True, skip citation references entirely.
    """
    parts = []

    def recurse(node):
        # If it's a citation ref
        if node.tag == f"{{{NS['t']}}}ref" and node.get("type") == "bibr":
            if omit_citations:
                # Skip the citation entirely
                return
            elif style:
                # Replace with formatted citation
                target = node.get("target", "").lstrip("#")
                parts.append(cite_string(target, refmap, style))
                return
        # Otherwise append node text if present
        if node.text:
            parts.append(node.text)
        # Recurse children
        for child in node:
            recurse(child)
            if child.tail:
                parts.append(child.tail)

    recurse(element)
    return norm_space("".join(parts))

def detect_heading_level(text, default_depth=2):
    """
    Detect heading level based on section numbering patterns.
    Returns the appropriate markdown heading level.

    Patterns:
    - Roman numerals (I., II., III., IV., etc.) -> Level 1
    - Single letters (A., B., C., etc.) -> Level 2
    - Numbers (1., 2., 3., etc.) or (1), (2), (3) -> Level 3
    - Otherwise use default_depth
    """
    import re

    # Strip and normalize text
    text = text.strip()

    # Roman numeral pattern at start (I., II., III., IV., V., VI., VII., VIII., IX., X., etc.)
    if re.match(r'^[IVX]+\.?\s+', text):
        return 1

    # Single letter pattern (A., B., C., etc.)
    if re.match(r'^[A-Z]\.?\s+', text):
        return 2

    # Number pattern (1., 2., 3.) or (1), (2), (3)
    if re.match(r'^\d+\.?\s+', text) or re.match(r'^\(\d+\)\s+', text):
        return 3

    # Default to provided depth
    return default_depth

def heading_md(level, text, max_level=3):
    lvl = min(max(1, level), max_level)
    return f'{"#"*lvl} {text}'.strip()

def extract_title(doc):
    title = doc.xpath("string(//t:teiHeader//t:titleStmt/t:title)", namespaces=NS)
    return norm_space(title)

def extract_abstract(doc):
    abstr = doc.xpath("//t:abstract", namespaces=NS)
    if not abstr:
        return ""
    # Prefer preserving inline citation replacements here too (rare in abstracts, but possible)
    return norm_space(" ".join(norm_space("".join(a.itertext())) for a in abstr))

def walk_body_divs(div, refmap, style, depth=1, max_level=3, omit_citations=False):
    """
    Yield Markdown chunks for a div (section) recursively.
    """
    chunks = []
    # Some TEI use <head> for section titles; there can be multiple heads; use the first visible one
    head = div.find("t:head", namespaces=NS)
    if head is not None:
        htxt = norm_space(head.xpath("string()", namespaces=NS))
        if htxt:
            # Use pattern detection to determine the appropriate heading level
            detected_level = detect_heading_level(htxt, default_depth=depth)
            chunks.append(heading_md(detected_level, htxt, max_level))
            chunks.append("")

    # Process only direct children elements (not nested in subdivs)
    # First collect all child divs to exclude their content
    child_divs = div.findall("t:div", namespaces=NS)

    # Paragraphs - only direct children not inside nested divs
    for p in div.xpath("./t:p", namespaces=NS):
        text = para_text_with_inline_cites(p, refmap, style, omit_citations=omit_citations)
        if text:
            chunks.append(text)

    # Figures - only direct children not inside nested divs
    for fig in div.xpath("./t:figure", namespaces=NS):
        cap = norm_space(" ".join(fig.xpath(".//t:figDesc//text()", namespaces=NS)))
        if cap:
            chunks.append(f"> **Figure.** {cap}")

    # Tables - only direct children not inside nested divs
    for tb in div.xpath("./t:table", namespaces=NS):
        cap = norm_space(" ".join(tb.xpath(".//t:head//text()", namespaces=NS)))
        if cap:
            chunks.append(f"> **Table.** {cap}")

    # Recurse into child divs as subsections with incremented depth
    for child in child_divs:
        chunks.extend(walk_body_divs(child, refmap, style, depth=depth+1, max_level=max_level, omit_citations=omit_citations))

    # Spacing after a section
    if chunks and chunks[-1] != "":
        chunks.append("")
    return chunks

def tei_to_markdown(doc, inline_style=None, max_level=3, omit_references=False, omit_citations=False):
    """
    inline_style: None or "author-title"
    omit_references: If True, skip the References section
    omit_citations: If True, remove inline citation markers from text
    """
    refmap = build_biblio_map(doc)
    # Title
    title = extract_title(doc)
    md = []
    if title:
        md.append(heading_md(1, title, max_level=max_level))
        md.append("")

    # Abstract
    abstract = extract_abstract(doc)
    if abstract:
        md.append("**Abstract**")
        md.append("")
        md.append(abstract)
        md.append("")

    # Body
    body = doc.find(".//t:text//t:body", namespaces=NS)
    if body is not None:
        # Top-level sections
        for div in body.findall("t:div", namespaces=NS):
            md.extend(walk_body_divs(div, refmap, inline_style, depth=2, max_level=max_level, omit_citations=omit_citations))

    # References
    # We keep the original numbered list (in order as in TEI), even if inline citations were rewritten.
    if not omit_references:
        bibls = doc.xpath("//t:back//t:listBibl//t:biblStruct", namespaces=NS)
        if bibls:
            md.append(heading_md(2, "References", max_level=max_level))
            md.append("")
            for i, bibl in enumerate(bibls, 1):
                full = norm_space(" ".join(bibl.xpath(".//text()", namespaces=NS)))
                md.append(f"{i}. {full}")
            md.append("")

    return "\n".join(md).rstrip() + "\n"

def main():
    ap = argparse.ArgumentParser(description="Convert GROBID TEI XML to Markdown with optional inline citation replacement.")
    ap.add_argument("input", help="Input TEI XML from GROBID")
    ap.add_argument("output", help="Output Markdown file")
    ap.add_argument("--inline-citations", choices=["author-title"], default=None,
                    help="Rewrite inline citations, e.g., (Surname, \"Title\").")
    ap.add_argument("--max-level", type=int, default=3,
                    help="Maximum markdown heading level to emit (default: 3)")
    ap.add_argument("--omit-references", action="store_true",
                    help="Omit the References section from the output")
    ap.add_argument("--omit-citations", action="store_true",
                    help="Remove inline citation markers from the text")
    args = ap.parse_args()

    doc = etree.parse(args.input)
    md = tei_to_markdown(doc, inline_style=args.inline_citations, max_level=args.max_level,
                        omit_references=args.omit_references, omit_citations=args.omit_citations)
    with open(args.output, "w", encoding="utf-8") as f:
        f.write(md)

if __name__ == "__main__":
    main()

