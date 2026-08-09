# Makefile for building the academic CV
# Uses lualatex because cv_academic.tex requires fontspec
#
# NOTE: this repo is public and this directory is web-served (app.py uses
# static_folder='.'), so anything placed here is reachable at cabird.com/cv/.
# Private CV variants are maintained outside this repository. Keep it that way.

# Main target
.PHONY: all
all: cv_academic.pdf

# Build the CV
cv_academic.pdf: cv_academic.tex cv.bib
	lualatex cv_academic.tex
	bibtex cv_academic
	lualatex cv_academic.tex
	lualatex cv_academic.tex

# Clean auxiliary files
.PHONY: clean
clean:
	rm -f cv_academic.aux cv_academic.bbl cv_academic.blg cv_academic.log \
	      cv_academic.out cv_academic.toc cv_academic.lof cv_academic.lot \
	      cv_academic.fls cv_academic.fdb_latexmk cv_academic.synctex.gz

# Clean everything including the PDF
.PHONY: cleanall
cleanall: clean
	rm -f cv_academic.pdf

# View the PDF (if you have a PDF viewer)
.PHONY: view
view: cv_academic.pdf
	@if command -v xdg-open >/dev/null 2>&1; then \
		xdg-open cv_academic.pdf; \
	elif command -v open >/dev/null 2>&1; then \
		open cv_academic.pdf; \
	else \
		echo "No PDF viewer found"; \
	fi
