// script.js
const API_KEY = '935711b5b72a4be5b4629aa1ac46fc9c'; // Get yours at newsapi.org
const newsContainer = document.getElementById('news-container');
const categoryTitle = document.getElementById('current-category');

async function loadNews(category = 'general') {
    categoryTitle.innerText = category.charAt(0).toUpperCase() + category.slice(1) + " News";
    newsContainer.innerHTML = '<p class="loading">Fetching latest stories...</p>';

    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.articles) {
            displayNews(data.articles);
        } else {
            newsContainer.innerHTML = `<p>Error: ${data.message}</p>`;
        }
    } catch (error) {
        console.error("Fetch error:", error);
        newsContainer.innerHTML = "<p>Unable to load news. Please try again later.</p>";
    }
}

function displayNews(articles) {
    newsContainer.innerHTML = ""; // Clear loader
    
    articles.forEach(article => {
        if (!article.urlToImage) return; // Skip articles without images for better UI

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${article.urlToImage}" alt="News Image">
            <div class="card-content">
                <h3>${article.title}</h3>
                <p>${article.description || "No description available."}</p>
                <a href="${article.url}" target="_blank" class="btn-read">Read More →</a>
            </div>
        `;
        newsContainer.appendChild(card);
    });
}

// Initial load
loadNews('general');