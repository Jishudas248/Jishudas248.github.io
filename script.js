document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results-container');

    // Function to create and display raag cards
    const displayRaags = (raagArray) => {
        resultsContainer.innerHTML = ''; // Clear previous results

        if (raagArray.length === 0) {
            resultsContainer.innerHTML = '<p class="message">No results found.</p>';
            return;
        }

        raagArray.forEach(raag => {
            const card = document.createElement('article');
            card.className = 'raag-card';

            let bandishesHTML = '';
            if (raag.bandishes && raag.bandishes.length > 0) {
                raag.bandishes.forEach(bandish => {
                    bandishesHTML += `
                        <div class="bandish">
                            <h4>${bandish.title}</h4>
                            <p>${bandish.lyrics}</p>
                        </div>
                    `;
                });
            } else {
                bandishesHTML = '<p>No bandishes currently listed for this Raag.</p>';
            }


            card.innerHTML = `
                <h2>${raag.name}</h2>
                <p class="thaat">Thaat: ${raag.thaat}</p>
                <div class="details-grid">
                    <p><strong>Aaroh (आरोह):</strong> ${raag.aaroh}</p>
                    <p><strong>Avroh (अवरोह):</strong> ${raag.avroh}</p>
                    <p><strong>Pakad (पकड़):</strong> ${raag.pakad}</p>
                    <p><strong>Vadi (वादी):</strong> ${raag.vadi}</p>
                    <p><strong>Samvadi (संवादी):</strong> ${raag.samvadi}</p>
                    <p><strong>Time (समय):</strong> ${raag.time}</p>
                </div>

                <div class="technical-details">
                    <h3>Technical Analysis</h3>
                    <p><strong>Similar Raags:</strong> ${raag.similar_raags || 'N/A'}</p>
                    <p><strong>Semitones (Unique):</strong> ${raag.semitones || 'N/A'}</p>
                    <p><strong>Closest Western Scale:</strong> ${raag.western_scale || 'N/A'}</p>
                </div>

                <div class="bandishes">
                    <h3>Bandishes (बंदिशें)</h3>
                    ${bandishesHTML}
                </div>
            `;
            resultsContainer.appendChild(card);
        });
    };

    // Handle the search form submission
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent page reload
        const query = searchInput.value.toLowerCase().trim();

        if (!query) {
            displayRaags(raags); // If search is empty, show all raags
            return;
        }

        const filteredRaags = raags.filter(raag => {
            const inRaagName = raag.name.toLowerCase().includes(query);
            
            // Ensure bandishes exist before trying to search them
            const inBandish = raag.bandishes && raag.bandishes.some(bandish => 
                bandish.title.toLowerCase().includes(query) || 
                (bandish.lyrics && bandish.lyrics.toLowerCase().includes(query))
            );

            return inRaagName || inBandish;
        });

        displayRaags(filteredRaags);
    });

    // Initial display of all raags on page load
    displayRaags(raags);
});