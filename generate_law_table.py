import csv

# Function to generate the HTML table from the CSV data
def generate_law_table(csv_file):
    # Reading the CSV file
    with open(csv_file, newline='') as f:
        reader = csv.DictReader(f)
        data = list(reader)

    # Generate the HTML for the table with sortable headers
    html_table = """
    <div class="table-container">
        <div class="tableControls">
            <input type="text" id="searchInput" onkeyup="filterTable('lawTable', 1)" placeholder="Search for legislation..." class="searchBar">
            <button id="favoritesButton" onclick="toggleFavorites('lawTable')">Show Favorites</button>
        </div>
        <table id="lawTable" class = "tableCenter">
                <thead>
                    <tr>
                        <th onclick="sortTable('lawTable', 0)" class = "col2">Article</th>
                        <th onclick="sortTable('lawTable', 1)">Article Name</th>
                        <th>Description</th>
                        <th class><i class="fa-regular fa-heart"></i></th>  
                    </tr>
                </thead>
                <tbody>
    """

    # Generate table rows
    for row in data:
        html_table += "\t<tr>\n"
        html_table += f"\t\t<td>{row['Article']}</td>\n"
        html_table += f"\t\t<td>{row['Article Name']}</td>\n"
        html_table += f"\t\t<td>{row['Description']}</td>\n"
        html_table += f'\t\t<td><i class="fa-regular fa-heart" onclick="toggleFavorite(this)"></i></td>\n'  # Add heart icon
        html_table += "\t</tr>\n"



    html_table += """
                </tbody>
            </table>
    """

    return html_table

# Function to create the final HTML file
def create_html_page(csv_file, output_html, css_file):
    # Generate the law table HTML
    law_table = generate_law_table(csv_file)

    # Create the final HTML structure
    html_content = f"""<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Environmental Conservation Laws</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        <link rel="stylesheet" href="{css_file}">
        <link rel="stylesheet" href="css/style.css">
        <script src="js/components/navbar.js"></script>
        
    </head>
    <body>
        <div class="center">
            <h1>Environmental Conservation Laws</h1>
            <p>This table lists environmental conservation laws in New York, sortable by article number and name.</p>
                {law_table}
        </div>
        <script src="js/components/header.js"></script>
        <script src="js/components/sortTable.js"></script>
        <script src="js/index.js"></script>
        <script>document.addEventListener("DOMContentLoaded", restoreFavoriteIcons('lawTable'));</script>
    </body>
</html>
    """

    # Write the HTML content to the output file
    with open(output_html, 'w') as f:
        f.write(html_content)

# Run the script with a CSV file and output HTML file
if __name__ == "__main__":
    create_html_page('assets/laws.csv', 'conservation_laws.html', 'css/components/table.css')
