// Author            : Addan Zahra and Rojauhn Noble
// Student ID        : 100883421   ||  100849533
// Date of Completion: February 24, 2024

// Function to search content in website
function searchContent() {
    var searchTerm = $('#searchInput').val().toLowerCase();

    var searchResults = [];

    // getting the content from the main page and including the <p>, <h1>, and <h2> tags
    $('#welcome-text p, #welcome-text h1, #welcome-text h2').each(function () {
        var content = $(this).text().toLowerCase();
        if (content.includes(searchTerm)) {
            searchResults.push($(this).html());
        }
    });

    // Getting the content from the other pages
    var otherPageUrls = ["./blog.html", "./careers.html", "./events.html", "./gallery.html", "./maps.html",
        "./portfolio.html", "./services.html", "./team.html"];
    otherPageUrls.forEach(function (url) {
        $.ajax({
            url: url,
            async: false,
            success: function (data) {
                $(data).find('p, h1, h2').each(function () {
                    var content = $(this).text().toLowerCase();
                    if (content.includes(searchTerm)) {
                        searchResults.push($(this).html());
                    }
                });
            }
        });
    });
    displaySearchResults(searchResults);
}

// Function to display the search results
function displaySearchResults(results) {
    var resultsContainer = $('#searchResults');
    resultsContainer.empty();

    if (results.length === 0) {
        resultsContainer.html('<p>No results found.</p>');
    } else {
        // Show only the first matched result
        resultsContainer.append('<div class="search-result">' + results[0] + '</div>');
    }
}
