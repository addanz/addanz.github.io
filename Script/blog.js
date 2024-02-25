// Author            : Addan Zahra and Rojauhn Noble
// Student ID        : 100883421   ||  100849533
// Date of Completion: February 24, 2024

// Function to toggle the content
function toggleContent(link) {
    var article = $(link).closest('article');
    article.find('.full-content').slideToggle();
}

// Function to load blog posts using AJAX
function loadBlogPosts() {
    var jsonUrl = './Data/blog-posts.json';

    $.ajax({
        url: jsonUrl,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            displayBlogPosts(data);
        },
        error: function (error) {
            console.error('Error loading blog posts:', error);
        }
    });
}

// Function to display blog posts on the page
function displayBlogPosts(posts) {
    var blogPostsSection = $('#blog-posts');

    blogPostsSection.empty();

    $.each(posts, function (index, post) {
        var article = $('<article>');
        article.append('<h2>' + post.title + '</h2>');
        article.append('<p class="summary">' + post.summary + '</p>');
        article.append('<p class="full-content">' + post.content + '</p>');
        article.append('<a href="#" onclick="toggleContent(this); return false;">Read More</a>');
        article.append('<hr>');

        blogPostsSection.append(article);
    });
}

// Running the load blog posts function
$(document).ready(function () {
    loadBlogPosts();
});