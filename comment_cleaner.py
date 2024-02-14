import re

def remove_html_comments(file_path):
    with open(file_path, 'r') as file:
        html_content = file.read()

    # Regular expression to find HTML comments
    html_without_comments = re.sub(r'<!--[\s\S]*?-->', '', html_content)

    with open(file_path, 'w') as file:
        file.write(html_without_comments)

html_file_path = 'index.html'  # Replace with your HTML file path
remove_html_comments(html_file_path)