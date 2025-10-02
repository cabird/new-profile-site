#!/bin/bash

# Build script to copy necessary files from parent directory into site/

echo "Starting build process..."

# Copy paper_data.json
echo "Copying paper_data.json..."
cp ../paper_data.json .

# Copy PDFs directory
echo "Copying pdfs directory..."
cp -r ../pdfs .

# Copy markdowns directory
echo "Copying markdowns directory..."
cp -r ../markdowns .

echo "Build complete!"
echo "Files copied:"
echo "  - paper_data.json"
echo "  - pdfs/"
echo "  - markdowns/"
