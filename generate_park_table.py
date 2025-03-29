import csv

def generate_park_table(csv_file):
    # reads csv
    with open(csv_file, newline='') as f:
        reader = csv.DictReader(f)
        data = list(reader)

    # initial html
    html_table = """
    <div class="table-container">
        <div class="tableControls">
            <input type="text" id="searchInput" onkeyup="filterTable('parkTable')" placeholder="Search for parks..." class="searchBar">
            <button id="favoritesButton" onclick="toggleFavorites('parkTable')">Show Favorites</button>
        </div>
        <table id="parkTable" class="tableCenter">
                <thead>
                    <tr>
                        <th onclick="sortTable('parkTable', 0)">Park Name</th>
                        <th onclick="sortTable('parkTable', 1)">Location</th>
                        <th onclick="sortTable('parkTable', 2)">Borough</th>
                        <th onclick="sortTable('parkTable', 3)">Type/Category</th>
                        <th onclick="sortTable('parkTable', 4)">Acreage</th>
                        <th>Park URL</th>
                        <th><i class="fa-regular fa-heart"></i></th>
                    </tr>
                </thead>
                <tbody>
    """

    # table rows
    for row in data:
        html_table += "\t<tr>\n"
        html_table += f"\t\t<td>{row['NAME311']}</td>\n"
        html_table += f"\t\t<td>{row['LOCATION']}</td>\n"
        html_table += f"\t\t<td>{row['BOROUGH']}</td>\n"
        html_table += f"\t\t<td>{row['TYPECATEGORY']}</td>\n"
        html_table += f"\t\t<td>{row['ACRES']}</td>\n"
        html_table += f'\t\t<td><a href="{row["URL"]}" target="_blank">Visit Park</a></td>\n'
        html_table += f'\t\t<td><i class="fa-regular fa-heart" onclick="toggleFavorite(this)"></i></td>\n'
        html_table += "\t</tr>\n"

    html_table += """
                </tbody>
            </table>
    </div>
    """

    return html_table


def create_html_page(csv_file, output_html, css_file):
    park_table = generate_park_table(csv_file)

    html_content = f"""<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>NYC Parks Directory</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        <link rel="stylesheet" href="{css_file}">
        <link rel="stylesheet" href="css/style.css">
        <script src="js/components/navbar.js"></script>
    </head>
    <body>
        <div class="center">
            <h1>NYC Parks Directory</h1>
            <p>This table lists various parks in NYC along with their details and links.</p>
                {park_table}
        </div>
        <script src="js/components/navbar.js"></script>
        <script src="js/components/sortTable.js"></script>
        <script src="js/index.js"></script>
        <script>document.addEventListener("DOMContentLoaded", restoreFavoriteIcons('parkTable'));</script>
    </body>
</html>
    """
    with open(output_html, 'w') as f:
        f.write(html_content)


if __name__ == "__main__":
    create_html_page('assets/parks.csv', 'nyc_parks.html', 'css/components/table.css')
