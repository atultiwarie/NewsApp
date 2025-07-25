const API_KEY = "d312a1d401294daabcaeca984b885c8a";

const newsContainer = document.querySelector("#news-container");
const nav = document.querySelector(".nav");

let fetchNews = async (category) => {
  try {
    const API_URL = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;
    const res = await fetch(API_URL);
    const data = await res.json();
    console.log(data);
    displayNews(data.articles)
  } catch (error) {
    console.error("Error to fetch news :", error);
  }
};

fetchNews("general");

nav.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const category = e.target.getAttribute("data-category");
    fetchNews(category);
  }
});
function displayNews(articles) {
  newsContainer.innerHTML = "";
  if (articles.length === 0) {
    newsContainer.innerHTML = "<h2>No news found</h2>";
    return;
  }
  articles.forEach((article) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
            <img src=${
              article.urlToImage ||
              "https://i.pinimg.com/1200x/8a/23/dd/8a23ddc7d01e5fec75dab48960b35aca.jpg"
            } alt="News Image">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
    newsContainer.appendChild(card);
  });
}
