let apiQuotes = [];
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show new quote
function newQuote() {
    showLoadingSpinner();
    // Pick a random quote from apiQuotes array 
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author field is blank and replace with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Uknown';
    }   else {
        authorText.textContent = quote.author;
    }
    // Check quote length to determine styling
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // Set quote
    quoteText.textContent = quote.text;
    // Hide loader
    hideLoadingSpinner();
  
}


// Get quotes from API
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();

    } catch(error) {
        // catch error here
        alert(error);
    }
}

// Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}


// Event listeners
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);

// On load 
getQuotes();

