// Rebuild an Etsy search results page using HTML, CSS, & a JavaScript function that creates and displays each result using an object. This assignment requires that you know how to work with the DOM.
var etsy = {};

getData();

function getData() {
    fetch('https://thinksaydo.com/tiyproxy.php?https://openapi.etsy.com/v2/listings/active?api_key=h9oq2yf3twf4ziejn10b717i&keywords=' + encodeURIComponent('board games') + '&includes=Images,Shop')
        .then(response => response.json())
        .then(data => {
            etsy = data;

            console.log(etsy);

            renderItemCard();
        });
}

function renderItemCard() {
    etsy.results.forEach(createSearchResultCard)
}


// for (var i = 0; i < 12; i++) {
//     createSearchResultCard({
//         src: 'http://unsplash.it/600?random',
//         description: 'Some product description...',
//         seller: 'HBakerStudio',
//         price: '$18.00'
//     });
// }


function createSearchResultCard(data) {
    var card = `<div class="col-sm-4 col-md-3">
        <div class="card">
            <img src="${data.Images[0].url_170x135}"/>
            <div class="card-caption">
                <div>${data.title.slice(0, 60)}...</div>
                <div>
                    <span class="text-muted">${data.Shop.shop_name}</span>
                    <span class="text-success pull-right">${data.price}</span>
                </div>
            </div>
        </div>
    </div>`;

    document.querySelector('#cards').innerHTML += card;
}