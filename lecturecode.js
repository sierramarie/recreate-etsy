// READ THROUGH THIS AND RESUBMIT. COLLIN ADDED SEARCH BAR FOR US. THANK YOU YEEZUS


// Add an event listenr to the search input text box
document.querySelector('#searchTerm').addEventListener('keypress', function(e) {
    // The e object contains info about the keypress event that happened
    // console.log(e);

    // Only run the search again if someone presses the Enter key
    if (e.key === 'Enter') {
        searchEtsy();
    }
});

// Add event listener to the search button that responds to clicks and runs the searchEtsy function
document.querySelector('#searchButton').addEventListener('click', searchEtsy);

// When the page is first loaded we pre-populate the page by running an initial search
searchEtsy();

// Yay! Our search function
function searchEtsy() {
    // Get the search term that the user typed into the search text box, with the .value property
    var searchTerm = document.querySelector('#searchTerm').value;
    
    // If no search term was provided, then we set it to a default value
    if (searchTerm === '') {
        searchTerm = 'hats';
    }

    // We put a loading message into the parent card container letting the user know that we're doing something
    document.querySelector('#cards').innerHTML = '<h3 class="text-center">Search Etsy and returning from outer space...</h3>';

    // If the search term isn't empty, we search
    if (searchTerm !== '') {
        // Run the search over at Etsy, proxying through a server because Etsy doesn't allow direct JS connections
        // We also insert the searchTerm variable, escaped of special characters, into the keywords= query parameter of the URL
        fetch('https://thinksaydo.com/tiyproxy.php?https://openapi.etsy.com/v2/listings/active?api_key=h9oq2yf3twf4ziejn10b717i&keywords=' + encodeURIComponent(searchTerm) + '&includes=Images,Shop')

        // We parse the response JSON
        .then(response => response.json())

        // We call a function to process the data
        .then(loopThroughSearchResults)
    }
}

// Here's where we get things done
function loopThroughSearchResults(data) {
    // Clear out the cards container so nothing is in it, ready for cards to be inserted
    document.querySelector('#cards').innerHTML = '';

    // If we have items in our array, we loop over them and render a card for each one
    if (data.results.length > 0) {
        data.results.forEach(function(item) {
            createSearchResultCard(item);
        });
    }

    // If we don't have any items in our array, we show a sad face
    else {
        document.querySelector('#cards').innerHTML = '<h3 class="text-center">:(</h3>';
    }
    
}


// This renders the card onto the screen, inserting item properties into the string template
// Note that you can use string methods, such as .slice(), within the template
function createSearchResultCard(data) {
    var card = `<div class="col-sm-4 col-md-3">
        <div class="card">
            <img src="${data.Images[0].url_170x135}"/>
            <div class="card-caption">
                <div>${data.title.slice(0,20)}...</div>
                <div>
                    <span class="text-muted">${data.Shop.shop_name}</span>
                    <span class="text-success pull-right">${data.price}</span>
                </div>
            </div>
        </div>
    </div>`;

    // We append the card string onto the innerHTML of the parent cards row
    document.querySelector('#cards').innerHTML += card;
}