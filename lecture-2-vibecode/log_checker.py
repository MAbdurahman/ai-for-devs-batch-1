import sys
import re
from collections import Counter

def highlight_red(text):
    """Wraps text in ANSI escape sequences for red color."""
    return f"\033[91m{text}\033[0m"

def analyze_logs(file_path):
    """Reads the log file and counts occurrences of each HTTP status code."""
    status_counts = Counter()
    
    # regex to find status codes (3 digits following a quoted string and a space)
    # This is a common pattern in Nginx/Apache logs: "GET ... HTTP/1.1" 200
    status_pattern = re.compile(r'\"[^\"]+\"\s+(\d{3})')

    try:
        with open(file_path, 'r') as file:
            for line in file:
                match = status_pattern.search(line)
                if match:
                    status_code = match.group(1)
                    status_counts[status_code] += 1
                else:
                    # Silently skip lines that don't match or handle as error?
                    # The prompt says: handle cases where file has wrong format
                    # If the file exists but no status codes are found, we should probably warn.
                    pass
        
        if not status_counts:
            print("Warning: No valid HTTP status codes found in the file.")
            return

        # Sort by status code for consistent output
        for status in sorted(status_counts.keys()):
            count = status_counts[status]
            output = f"status {status}: {count} request"
            
            if int(status) >= 400:
                print(highlight_red(output))
            else:
                print(output)

    except FileNotFoundError:
        print(f"Error: The file '{file_path}' was not found.")
        sys.exit(1)
    except PermissionError:
        print(f"Error: Permission denied when trying to read '{file_path}'.")
        sys.exit(1)
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python log_checker.py <path_to_log_file>")
        sys.exit(1)
    
    analyze_logs(sys.argv[1])
