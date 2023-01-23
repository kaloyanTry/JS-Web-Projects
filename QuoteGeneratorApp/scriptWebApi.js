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

function removeLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// //Get Quote from API
async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    if (data.quoteAuthor === '') {
      authorText.textContent = 'Unkinown';
    } else {
      authorText.textContent = data.quoteAuthor;
    }

    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = data.quoteText;
    removeLoadingSpinner();
  } catch (error) {
    console.log('whoops, there is error', error);
  }
}

newQuoteBtn.addEventListener('click', getQuote);
getQuote();
