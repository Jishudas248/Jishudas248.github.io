document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('glossary-search-input');
    const glossaryContainer = document.getElementById('glossary-container');

    const displayTerms = (terms) => {
        glossaryContainer.innerHTML = ''; // Clear previous results

        if (terms.length === 0) {
            glossaryContainer.innerHTML = '<p class="message">No terms match your search.</p>';
            return;
        }

        terms.forEach(item => {
            const termElement = document.createElement('article');
            termElement.className = 'glossary-item';
            termElement.innerHTML = `
                <h3 class="glossary-term">${item.term}</h3>
                <p class="glossary-definition">${item.definition}</p>
            `;
            glossaryContainer.appendChild(termElement);
        });
    };

    searchInput.addEventListener('keyup', (event) => {
        const query = event.target.value.toLowerCase().trim();

        const filteredTerms = glossaryTerms.filter(item => {
            return item.term.toLowerCase().includes(query) || item.definition.toLowerCase().includes(query);
        });

        displayTerms(filteredTerms);
    });

    // Initial display of all terms
    displayTerms(glossaryTerms);
});