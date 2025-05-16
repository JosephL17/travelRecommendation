const clearButton = () => {
    document.getElementById("search").value = '';
}

let travelData; 


fetch('travel_recommendation_api.json')
  .then(res => res.json())
  .then(data => {
    travelData = data;
  })
  .catch(err => console.error('Failed to load data:', err));

function handleSearch() {
  const input = document.getElementById('search').value.toLowerCase().trim();
  const resultsDiv = document.getElementById('location-display');
  resultsDiv.innerHTML = '';

  
  const keywordMap = {
    beach: 'beaches',
    beaches: 'beaches',
    temple: 'temples',
    temples: 'temples',
    country: 'countries',
    countries: 'countries'
  };

  const category = keywordMap[input];

  if (!category || !travelData) {
    resultsDiv.innerHTML = '<p>No matching results found.</p>';
    return;
  }

  let itemsToDisplay = [];

  
  if (category === 'countries') {
    travelData.countries.forEach(country => {
      country.cities.forEach(city => {
        itemsToDisplay.push({
          name: city.name,
          description: city.description,
          imageUrl: city.imageUrl
        });
      });
    });
  } else {
    itemsToDisplay = travelData[category];
  }

  // Display cards
  if (itemsToDisplay.length === 0) {
    resultsDiv.innerHTML = '<p>No results found in this category.</p>';
    return;
  }

  itemsToDisplay.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style = `
      border: 1px solid #ccc;
      border-radius: 10px;
      margin: 10px;
      padding: 10px;
      max-width: 300px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;

    card.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.name}" style="width: 100%; border-radius: 10px;">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <button onclick="alert('Learn more about ${item.name}')">Learn More</button>
    `;

    resultsDiv.appendChild(card);
    clearButton()
  });
}