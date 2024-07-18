const accessKey = ''; // Replace with your Unsplash API access key

const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('show-more-btn');

let keyword = "";
let page = 1;

function showPopupTemplate() {
    const popupTemplate = document.createElement('div');
    popupTemplate.classList.add('popup-template');
    popupTemplate.innerHTML = `
        <div class="popup-content">
            <h2>Access key has been removed</h2>
            <p>Use Your Unsplash API access key</p>
        </div>
    `;
    document.body.appendChild(popupTemplate);

    setTimeout(() => {
        popupTemplate.remove();
    }, 2000); 
}

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if(page === 1) {
        searchResult.innerHTML = "";
    }

    const result = data.results;

    result.forEach(getResult => {
        const image = document.createElement('img');
        image.src = getResult.urls.small;
        const imgLink = document.createElement('a');
        imgLink.href = getResult.links.html;
        imgLink.target = "_blank";

        imgLink.appendChild(image);
        searchResult.appendChild(imgLink);
    });

    showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener('click', () => {
    page++;
    searchImages();
});

showPopupTemplate();