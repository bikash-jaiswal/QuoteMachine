// for dev tool testing
// console.log('testing');
const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const quoteAuthor = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const nextQuoteBtn = document.getElementById('next-quote')
// for loader
const loader = document.getElementById('loader');



function fromLocal(){
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    console.log(quote)
}


let data = [];

// show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide Loading
function complete(){
    loader.hidden = true
    quoteContainer.hidden = false;

}

function randomQuote(data){
    // pick a random quotw from data array
    loading()
    const quote = data[Math.floor(Math.random() * data.length)];
    // if author is null
    if (!quote.author){
        quote.author = "Unknown";
    }
    // check the quote length to determine stylinh
    if (quote.text.length > 72){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    // set text and compete loader
    quoteAuthor.textContent = quote.author;
    quoteText.textContent = quote.text;
    
    complete()
}




// getting quote for Rest-Api
async function getQuote(){
    loading();
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const apiURL = 'https://type.fit/api/quotes';
    try {
        // dont assign until data is fetch
        const response = await fetch(apiURL);
        const data = await response.json();
        // console.log(data);
        randomQuote(data);
        

    } catch (error) {
        // catch error
        console.log('no quote',error)
    }

}

// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} --${quoteAuthor.textContent}`
    window.open(twitterUrl,'_blank')
}

// Event Listeners
nextQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click',tweetQuote)

// function call
getQuote();
// fromLocal();

// EventListener for button