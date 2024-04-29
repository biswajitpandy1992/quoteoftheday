document.addEventListener('DOMContentLoaded', function () {
    const quoteElem = document.getElementById('quote');
    const authorElem = document.getElementById('author');
    const newQuoteBtn = document.getElementById('new-quote-btn');
    const loader = document.getElementById('loader');
    const copyQuoteBtn = document.getElementById('copy-quote-btn');
    const shareWhatsappBtn = document.getElementById('share-whatsapp-btn');

    newQuoteBtn.addEventListener('click', function () {
        loader.style.display = 'block';
        fetchQuote();
    });

    copyQuoteBtn.addEventListener('click', function () {
        navigator.clipboard.writeText(quoteElem.textContent + " " + authorElem.textContent)
            .then(() => alert('Quote copied to clipboard!'))
            .catch(err => console.error('Error copying text: ', err));
    });

    shareWhatsappBtn.addEventListener('click', function () {
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(quoteElem.textContent + " " + authorElem.textContent)}`;
        window.open(whatsappUrl, '_blank');
    });

    function fetchQuote() {
        fetch('https://api.quotable.io/random')
            .then(response => response.json())
            .then(data => {
                quoteElem.textContent = `"${data.content}"`;
                authorElem.textContent = `- ${data.author}`;
                loader.style.display = 'none';
            })
            .catch(error => {
                console.error('Error fetching quote:', error);
                loader.style.display = 'none';
            });
    }

    fetchQuote();
});
