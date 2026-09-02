// Sample travel dataset
const travelRecommendations = {
    countries: [
        {
            name: "Australia",
            cities: [
                { name: "Sydney", description: "Famous for its Sydney Opera House and Harbour Bridge.", imageUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=500&q=80" },
                { name: "Melbourne", description: "Known for its arts, coffee culture, and hidden laneways.", imageUrl: "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&w=500&q=80" }
            ]
        },
        {
            name: "Japan",
            cities: [
                { name: "Tokyo", description: "A bustling metropolis blending ultra-modern and traditional styles.", imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=500&q=80" },
                { name: "Kyoto", description: "Famous for its classical Buddhist temples and gardens.", imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=500&q=80" }
            ]
        }
    ],
    temples: [
        { name: "Angkor Wat, Cambodia", description: "A massive temple complex featuring intricate stone carvings.", imageUrl: "https://images.unsplash.com/photo-1578895101408-1a364e49d747?auto=format&fit=crop&w=500&q=80" },
        { name: "Taj Mahal, India", description: "An iconic white marble mausoleum symbolizing eternal love.", imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=500&q=80" }
    ],
    beaches: [
        { name: "Bora Bora, French Polynesia", description: "Known for its turquoise waters and luxurious overwater bungalows.", imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80" },
        { name: "Maui, Hawaii", description: "Famous for its pristine beaches, scenic drives, and whale watching.", imageUrl: "https://images.unsplash.com/photo-1540202404-1b929e208380?auto=format&fit=crop&w=500&q=80" }
    ]
};

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const resultsContainer = document.getElementById('resultsContainer');

// Search functionality
searchBtn.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase().trim();
    resultsContainer.innerHTML = ""; // Clear previous results

    if (!query) return;

    let matchedResults = [];

    // Check keywords matching categories or item names
    if (query.includes('beach')) {
        matchedResults = travelRecommendations.beaches;
    } else if (query.includes('temple')) {
        matchedResults = travelRecommendations.temples;
    } else if (query.includes('country')) {
        // Return recommendations for all countries (Australia and Japan)
        travelRecommendations.countries.forEach(country => {
            matchedResults.push(...country.cities);
        });
    } else {
        // Search across all cities, temples, and beaches
        travelRecommendations.countries.forEach(country => {
            country.cities.forEach(city => {
                if (city.name.toLowerCase().includes(query) || city.description.toLowerCase().includes(query)) {
                    matchedResults.push(city);
                }
            });
        });
        travelRecommendations.temples.forEach(temple => {
            if (temple.name.toLowerCase().includes(query) || temple.description.toLowerCase().includes(query)) {
                matchedResults.push(temple);
            }
        });
        travelRecommendations.beaches.forEach(beach => {
            if (beach.name.toLowerCase().includes(query) || beach.description.toLowerCase().includes(query)) {
                matchedResults.push(beach);
            }
        });
    }

    // Render results
    if (matchedResults.length > 0) {
        matchedResults.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('result-card');
            card.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}">
                <div class="result-card-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            resultsContainer.appendChild(card);
        });
    } else {
        resultsContainer.innerHTML = `<p style="color: white; font-weight: bold; text-align: center; width: 100%;">No recommendations found for "${query}". Try searching for 'beach', 'temple', or 'country'.</p>`;
    }
});

// Clear functionality
clearBtn.addEventListener('click', () => {
    searchInput.value = "";
    resultsContainer.innerHTML = "";
});