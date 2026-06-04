from urllib.parse import urlparse


def format_repos(urls):
    """
    Format a list of GitHub repository URLs into a markdown table.

    Args:
        urls (list[str]): List of GitHub repository URLs.

    Returns:
        str: Markdown table containing repository information.

    Raises:
        ValueError: If any URL does not start with 'https://github.com/'.
    """
    header = "| Repo Name | Language | Is Fork |\n|---|---|---|"
    rows = []

    language_patterns = {
        ".py": "Python",
        ".js": "JavaScript",
        ".ts": "TypeScript",
        ".java": "Java",
        ".go": "Go",
        ".rb": "Ruby",
        ".php": "PHP",
        ".cs": "C#",
        ".cpp": "C++",
        ".c": "C",
        ".rs": "Rust",
        ".kt": "Kotlin",
        ".swift": "Swift",
    }

    for url in urls:
        if not url.startswith("https://github.com/"):
            raise ValueError(f"Invalid GitHub URL: {url}")

        parsed = urlparse(url)
        path_parts = [part for part in parsed.path.strip("/").split("/") if part]

        if len(path_parts) < 2:
            raise ValueError(f"Invalid repository URL: {url}")

        repo_name = path_parts[1]

        language = "Unknown"
        repo_name_lower = repo_name.lower()
        for pattern, lang in language_patterns.items():
            if pattern in repo_name_lower:
                language = lang
                break

        rows.append(f"| {repo_name} | {language} | No |")

    return "\n".join([header] + rows)


if __name__ == "__main__":
    example_urls = [
        "https://github.com/python/cpython",
        "https://github.com/example/project.py",
        "https://github.com/example/webapp.js",
    ]

    print(format_repos(example_urls))