# Makefile for building CV
# Uses lualatex because cv.tex requires fontspec

# Main target
.PHONY: all
all: cv.pdf

# Build the CV
cv.pdf: cv.tex cv.bib
	lualatex cv.tex
	bibtex cv
	lualatex cv.tex
	lualatex cv.tex

# Clean auxiliary files
.PHONY: clean
clean:
	rm -f cv.aux cv.bbl cv.blg cv.log cv.out cv.toc cv.lof cv.lot cv.fls cv.fdb_latexmk cv.synctex.gz

# Clean everything including PDF
.PHONY: cleanall
cleanall: clean
	rm -f cv.pdf

# View the PDF (if you have a PDF viewer)
.PHONY: view
view: cv.pdf
	@if command -v xdg-open >/dev/null 2>&1; then \
		xdg-open cv.pdf; \
	elif command -v open >/dev/null 2>&1; then \
		open cv.pdf; \
	else \
		echo "No PDF viewer found"; \
	fi
