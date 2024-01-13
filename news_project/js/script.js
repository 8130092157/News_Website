const API_KEY = "6c60a463977b4051ac0a03a7882be869";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchnews("India"));

function reload(){
    window.location.reload();
}

async function fetchnews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();

    bindData(data.articles);

}

function bindData(articles) {
    const cardContainer = document.getElementById("card-container");
    const newscardtemplate = document.getElementById("template-news-card");

    cardContainer.innerHTML = "";
    articles.forEach(article => {
        if (!article.urlToImage) {
            return;
        }

        const cardClone = newscardtemplate.content.cloneNode(true);
        fillDatainCard(cardClone, article);
        cardContainer.appendChild(cardClone);
    });

}

function fillDatainCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSrc = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",
        { timeZone: "Asia/Jakarta" });

    newsSrc.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })

}
let curr_selected_nav=null;
function onNavItemClick(id){
    fetchnews(id);
    const navItem=document.getElementById(id);
    curr_selected_nav?.classList.remove("active");
    curr_selected_nav=navItem;
    curr_selected_nav.classList.add("active");

}

const searchButton=document.getElementById("search-button");
const searchText=document.getElementById("search-text");

searchButton.addEventListener("click",()=>{
const query= searchText.value;
if(!query)
{
    return;
}
fetchnews(query);
curr_selected_nav.classList.remove("active");
curr_selected_nav=null;
})