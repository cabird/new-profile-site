from flask import Flask, send_from_directory, send_file
import os

app = Flask(__name__, static_folder='.')

@app.route('/')
def index():
    """Serve the main index.html page"""
    return send_file('index.html')

@app.route('/publications.html')
def publications():
    """Serve the publications page"""
    return send_file('publications.html')

@app.route('/<path:path>')
def serve_static(path):
    """Serve all other static files (JS, CSS, JSON, PDFs, etc.)"""
    return send_from_directory('.', path)

if __name__ == '__main__':
    # For local development
    app.run(debug=True, host='0.0.0.0', port=5000)
