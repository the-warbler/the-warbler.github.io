function sortTable(tableId, columnIndex) {
    const table = document.getElementById(tableId); // Get the table by ID
    const rows = Array.from(table.rows).slice(1); // Get all rows except the header

    // Determine the sorting direction
    const currentSortDirection = table.getAttribute("data-sort-direction") || "asc";
    const ascending = currentSortDirection === "asc";

    // Sort rows
    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].innerText; // Get text from cell A
        const cellB = rowB.cells[columnIndex].innerText; // Get text from cell B

        // Compare based on the column type (numbers, dates, or strings)
        const valueA = isNaN(cellA) ? cellA : parseFloat(cellA);
        const valueB = isNaN(cellB) ? cellB : parseFloat(cellB);

        if (valueA < valueB) return ascending ? -1 : 1; // Ascending or descending
        if (valueA > valueB) return ascending ? 1 : -1;
        return 0; // Equal values
    });

    // Append sorted rows back to the table body
    const tbody = table.tBodies[0];
    tbody.innerHTML = ""; // Clear the existing rows
    rows.forEach(row => tbody.appendChild(row)); // Append sorted rows

    // Toggle sort direction for the next click
    table.setAttribute("data-sort-direction", ascending ? "desc" : "asc");

    // Optional: Update the sorting indicator on the headers
    updateSortIndicators(tableId, columnIndex, ascending);
}

// Optional: Function to update sort indicators on headers
function updateSortIndicators(tableId, columnIndex, ascending) {
    const headers = document.querySelectorAll(`#${tableId} th`);
    headers.forEach((header, index) => {
        header.classList.remove("sort-asc", "sort-desc"); // Remove previous indicators
        if (index === columnIndex) {
            header.classList.add(ascending ? "sort-asc" : "sort-desc"); // Add current indicator
        }
    });
}

function filterTable(tableId, searchColumnIndex = null) {
    // Get the search query
    var input = document.getElementById("searchInput");
    var filter = input.value.toLowerCase();
    var table = document.getElementById(tableId);
    var tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those that don't match the search query
    for (var i = 1; i < tr.length; i++) { // Start from 1 to skip the header row
        var rowMatches = false;
        var td;

        // If searchColumnIndex is provided, search only that column
        if (searchColumnIndex !== null) {
            td = tr[i].getElementsByTagName("td")[searchColumnIndex];
            if (td) {
                var cellValue = td.textContent || td.innerText;
                if (cellValue.toLowerCase().indexOf(filter) > -1) {
                    rowMatches = true;
                }
            }
        } else {
            // If no searchColumnIndex, search across all columns in the row
            td = tr[i].getElementsByTagName("td");
            for (var j = 0; j < td.length; j++) {
                if (td[j]) {
                    var cellValue = td[j].textContent || td[j].innerText;
                    if (cellValue.toLowerCase().indexOf(filter) > -1) {
                        rowMatches = true;
                        break; // Stop searching other columns if a match is found
                    }
                }
            }
        }

        // Toggle visibility based on the match
        if (rowMatches) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}
// Toggle between regular and solid heart icon and manage localStorage
function toggleFavorite(icon) {
    var row = icon.parentElement.parentElement;
    var tableId = row.closest('table').id;
    var commonName = row.getElementsByTagName("td")[0].textContent; // Assuming the first column is "Primary Common Name"
    var favorites = JSON.parse(localStorage.getItem(tableId + '_favorites')) || [];

    if (icon.classList.contains("fa-regular")) {
        // Switch to solid heart
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
        // Add to favorites
        favorites.push(commonName);
        
    } else {
        // Switch back to regular heart
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
        // Remove from favorites
        favorites = favorites.filter(favorite => favorite !== commonName);
    }

    // Update local storage
    localStorage.setItem(tableId + '_favorites', JSON.stringify(favorites));
}

// Filter rows based on the favorites list
function toggleFavorites(tableId) {
    var table = document.getElementById(tableId);
    var favoritesButton = document.getElementById("favoritesButton");
    var favorites = JSON.parse(localStorage.getItem(tableId + '_favorites')) || [];
    var tr = table.getElementsByTagName("tr");

    // Check if we're currently showing favorites
    var showingFavorites = favoritesButton.classList.contains("showing-favorites");

    for (var i = 1; i < tr.length; i++) { // Start at 1 to skip header row
        var commonName = tr[i].getElementsByTagName("td")[0].textContent;
        if (showingFavorites) {
            // Show all rows when toggling back
            tr[i].style.display = "";
        } else {
            // Only show favorited rows
            if (favorites.indexOf(commonName) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

    // Toggle button state
    if (showingFavorites) {
        favoritesButton.classList.remove("showing-favorites");
        favoritesButton.textContent = "Show Favorites";
    } else {
        favoritesButton.classList.add("showing-favorites");
        favoritesButton.textContent = "Show All";
    }
}

// Function to restore solid heart icons for favorited items on page load
function restoreFavoriteIcons(tableId) {
    var table = document.getElementById(tableId);
    var favorites = JSON.parse(localStorage.getItem(tableId + '_favorites')) || [];
    var tr = table.getElementsByTagName("tr");

    for (var i = 1; i < tr.length; i++) { // Start at 1 to skip header row
        var commonName = tr[i].getElementsByTagName("td")[0].textContent;
        var heartIcon = tr[i].getElementsByTagName("i")[0]; // Assuming the heart icon is the first <i> element in each row

        if (favorites.indexOf(commonName) > -1) {
            // If the item is in the favorites list, set the heart to solid
            heartIcon.classList.remove("fa-regular");
            heartIcon.classList.add("fa-solid");
        }
    }
}