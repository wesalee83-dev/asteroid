#!/usr/bin/env python3
import subprocess
import sys
import os

def main():
    # All arguments passed from seed.js
    args = sys.argv[1:]

    # Resolve seedling.py relative to this file
    base_dir = os.path.dirname(os.path.abspath(__file__))
    seedling_path = os.path.join(base_dir, '..', '..', 'seedling.py')

    # Invoke seedling.py with the same arguments
    result = subprocess.run(
        ['python3', seedling_path] + args,
        capture_output=True,
        text=True
    )

    # Print stdout so seed.js can capture it
    if result.stdout:
        print(result.stdout.strip())

    # Print stderr if any
    if result.stderr:
        print(result.stderr.strip(), file=sys.stderr)

    # Exit with the same status code
    sys.exit(result.returncode)

if __name__ == "__main__":
    main()
