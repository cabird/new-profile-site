#!/bin/bash

# Build script for Render deployment
# paper_data.json is committed directly in site/ — no copy needed
# extracted/ contains paper markdown + figures (committed in repo root)

echo "Starting build process..."

# Install dependencies
pip install -r requirements.txt

echo "Build complete!"
