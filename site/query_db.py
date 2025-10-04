#!/usr/bin/env python3
"""
Database query utility for chat analytics.

Usage as CLI:
    # Query from command line
    python query_db.py "SELECT * FROM chat_messages LIMIT 5"

    # Query from file
    python query_db.py --file query.sql

    # Output to CSV file
    python query_db.py "SELECT * FROM chat_messages" --output results.csv

    # Pretty print to console (default)
    python query_db.py "SELECT COUNT(*) FROM chat_messages"

Usage as module:
    from query_db import execute_query, query_to_csv

    results = execute_query("SELECT * FROM chat_messages LIMIT 10")
    query_to_csv("SELECT * FROM chat_messages", "output.csv")
"""

import psycopg2
import csv
import sys
import os
import argparse
from dotenv import load_dotenv
from psycopg2.extras import RealDictCursor

# Load environment variables
load_dotenv()


def get_connection():
    """Get database connection using DATABASE_URL from environment.

    Returns:
        psycopg2 connection object or None if connection fails
    """
    database_url = os.getenv('DATABASE_URL')
    if not database_url:
        print("❌ ERROR: DATABASE_URL not set in environment", file=sys.stderr)
        print("   Make sure you have a .env file with DATABASE_URL", file=sys.stderr)
        return None

    try:
        conn = psycopg2.connect(database_url)
        return conn
    except Exception as e:
        print(f"❌ ERROR: Failed to connect to database: {e}", file=sys.stderr)
        return None


def execute_query(query, params=None, return_dict=False):
    """Execute a SQL query and return results.

    Args:
        query (str): SQL query to execute
        params (tuple, optional): Query parameters for parameterized queries
        return_dict (bool): If True, return rows as dictionaries

    Returns:
        list: List of tuples (or dicts if return_dict=True) with query results
        None: If query fails
    """
    conn = get_connection()
    if not conn:
        return None

    try:
        cursor_factory = RealDictCursor if return_dict else None
        cur = conn.cursor(cursor_factory=cursor_factory)

        if params:
            cur.execute(query, params)
        else:
            cur.execute(query)

        # Check if this is a SELECT query (returns results)
        if cur.description:
            results = cur.fetchall()
            column_names = [desc[0] for desc in cur.description]
            cur.close()
            conn.close()
            return column_names, results
        else:
            # For INSERT/UPDATE/DELETE, commit and return rowcount
            conn.commit()
            rowcount = cur.rowcount
            cur.close()
            conn.close()
            return None, f"Query executed successfully. Rows affected: {rowcount}"

    except Exception as e:
        print(f"❌ ERROR: Query failed: {e}", file=sys.stderr)
        if conn:
            conn.rollback()
            conn.close()
        return None, None


def results_to_csv(columns, rows, output_file=None):
    """Write query results to CSV format.

    Args:
        columns (list): Column names
        rows (list): Query results
        output_file (str, optional): Output file path. If None, writes to stdout

    Returns:
        bool: True if successful, False otherwise
    """
    try:
        if output_file:
            f = open(output_file, 'w', newline='', encoding='utf-8')
        else:
            f = sys.stdout

        writer = csv.writer(f, quoting=csv.QUOTE_MINIMAL, lineterminator='\n')

        # Write header
        writer.writerow(columns)

        # Write data rows
        for row in rows:
            # Convert dict to list if needed
            if isinstance(row, dict):
                row = [row[col] for col in columns]
            writer.writerow(row)

        if output_file:
            f.close()
            print(f"✅ Results written to {output_file}", file=sys.stderr)

        return True

    except Exception as e:
        print(f"❌ ERROR: Failed to write CSV: {e}", file=sys.stderr)
        if output_file and f:
            f.close()
        return False


def query_to_csv(query, output_file, params=None):
    """Execute query and write results directly to CSV file.

    Args:
        query (str): SQL query to execute
        output_file (str): Output CSV file path
        params (tuple, optional): Query parameters

    Returns:
        bool: True if successful, False otherwise
    """
    columns, rows = execute_query(query, params)
    if columns is None or rows is None:
        return False

    return results_to_csv(columns, rows, output_file)


def pretty_print_results(columns, rows, max_width=100):
    """Pretty print query results to console.

    Args:
        columns (list): Column names
        rows (list): Query results
        max_width (int): Maximum width for each column
    """
    if not rows:
        print("No results returned.")
        return

    # Calculate column widths
    col_widths = [len(col) for col in columns]
    for row in rows:
        if isinstance(row, dict):
            row = [row[col] for col in columns]
        for i, val in enumerate(row):
            val_str = str(val) if val is not None else 'NULL'
            # Truncate very long strings for display
            if len(val_str) > max_width:
                val_str = val_str[:max_width-3] + '...'
            col_widths[i] = max(col_widths[i], len(val_str))

    # Print header
    header = " | ".join(col.ljust(col_widths[i]) for i, col in enumerate(columns))
    print(header)
    print("-" * len(header))

    # Print rows
    for row in rows:
        if isinstance(row, dict):
            row = [row[col] for col in columns]
        row_strs = []
        for i, val in enumerate(row):
            val_str = str(val) if val is not None else 'NULL'
            # Truncate and clean newlines for display
            val_str = val_str.replace('\n', '\\n').replace('\r', '\\r')
            if len(val_str) > max_width:
                val_str = val_str[:max_width-3] + '...'
            row_strs.append(val_str.ljust(col_widths[i]))
        print(" | ".join(row_strs))

    print(f"\n({len(rows)} row{'s' if len(rows) != 1 else ''})")


def main():
    """Main CLI entry point."""
    parser = argparse.ArgumentParser(
        description='Execute SQL queries against the chat analytics database',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s "SELECT COUNT(*) FROM chat_messages"
  %(prog)s "SELECT * FROM chat_messages LIMIT 5" --output results.csv
  %(prog)s --file query.sql --output results.csv
  %(prog)s --file query.sql --format pretty
        """
    )

    parser.add_argument(
        'query',
        nargs='?',
        help='SQL query to execute (or use --file to read from file)'
    )

    parser.add_argument(
        '-f', '--file',
        help='Read query from file'
    )

    parser.add_argument(
        '-o', '--output',
        help='Output CSV file (default: stdout)'
    )

    parser.add_argument(
        '--format',
        choices=['csv', 'pretty'],
        default='pretty',
        help='Output format (default: pretty)'
    )

    args = parser.parse_args()

    # Get query from command line or file
    if args.file:
        try:
            with open(args.file, 'r') as f:
                query = f.read().strip()
        except Exception as e:
            print(f"❌ ERROR: Could not read file {args.file}: {e}", file=sys.stderr)
            return 1
    elif args.query:
        query = args.query
    else:
        parser.print_help()
        return 1

    # Execute query
    result = execute_query(query)
    if result is None:
        return 1

    columns, rows = result

    # Handle non-SELECT queries
    if columns is None:
        print(rows)
        return 0

    # Output results
    if args.output:
        # Force CSV format for file output
        success = results_to_csv(columns, rows, args.output)
        return 0 if success else 1
    elif args.format == 'csv':
        results_to_csv(columns, rows, None)
        return 0
    else:
        pretty_print_results(columns, rows)
        return 0


if __name__ == '__main__':
    sys.exit(main())
