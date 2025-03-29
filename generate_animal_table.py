import csv

def generate_animal_table(csv_file):
    with open(csv_file, newline='') as f:
        reader = csv.DictReader(f)
        data = list(reader)

    html_table = """
    <div class="table-container">
        <div class="tableControls">
            <input type="text" id="searchInput" onkeyup="filterTable('animalTable')" placeholder="Search for animals..." class="searchBar">
            <button id="favoritesButton" onclick="toggleFavorites('animalTable')">Show Favorites</button>
        </div>
        <table id="animalTable" class="tableCenter">
                <thead>
                    <tr>
                        <th onclick="sortTable('animalTable', 0)">Primary Common Name</th>
                        <th onclick="sortTable('animalTable', 1)" class = "col2">Scientific Name</th>
                        <th onclick="sortTable('animalTable', 2)">Class</th>
                        <th onclick="sortTable('animalTable', 3)">Order</th>
                        <th onclick="sortTable('animalTable', 4)">Family</th>
                        <th onclick="sortTable('animalTable', 5)" class = "col1">Federal Protection</th>
                        <th onclick="sortTable('animalTable', 6)" class = "col1">State Protection</th>
                        <th class = "wideCol">Image</th>
                        <th class><i class="fa-regular fa-heart"></i></th>

                    </tr>
                </thead>
                <tbody>
    """

    for row in data:
        common_name = row['Primary common name'].strip()
        img_common_name = common_name.replace(" ", "")
        image_name = f"{img_common_name}.png"  # Construct the image name
        image_tag = f'<img src="assets/img/animals/{image_name}" alt="{common_name}" width="100" />'  # Create the image tag

        html_table += "\t<tr>\n"
        html_table += f"\t\t<td>{common_name}</td>\n"
        html_table += f"\t\t<td>{row['Scientific name']}</td>\n"
        html_table += f"\t\t<td>{row['Class']}</td>\n"
        html_table += f"\t\t<td>{row['Order']}</td>\n"
        html_table += f"\t\t<td>{row['Family']}</td>\n"
        html_table += f"\t\t<td>{row['Federal protection']}</td>\n"
        html_table += f"\t\t<td>{row['State protection']}</td>\n"
        html_table += f"\t\t<td>{image_tag}</td>\n"  # Add the image tag to the table
        html_table += f'\t\t<td><i class="fa-regular fa-heart" onclick="toggleFavorite(this)"></i></td>\n'  # Add heart icon
        html_table += "\t</tr>\n"

    html_table += """
                </tbody>
            </table>
    """

    return html_table

# Function to create the final HTML file
def create_html_page(csv_file, output_html, css_file):
    # Generate the animal table HTML
    animal_table = generate_animal_table(csv_file)

    # Create the final HTML structure
    html_content = f"""<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Endangered Animal Species</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        <link rel="stylesheet" href="{css_file}">
        <link rel="stylesheet" href="css/style.css">
        <script src="js/components/navbar.js"></script>
    </head>
    <body>
        <div class="center">
            <h1>Endangered Animal Species</h1>
            <p>This table lists various endangered animal species along with their images and protection status.</p>
                {animal_table}
        </div>
        <script src="js/components/navbar.js"></script>
        <script src="js/components/sortTable.js"></script>
        <script src="js/index.js"></script>
        <script>document.addEventListener("DOMContentLoaded", restoreFavoriteIcons('animalTable'));</script>
    </body>
</html>
    """

    # Write the HTML content to the output file
    with open(output_html, 'w') as f:
        f.write(html_content)

# Run the script with a CSV file and output HTML file
if __name__ == "__main__":
    create_html_page('assets/endangered.csv', 'endangered_species.html', 'css/components/table.css')
