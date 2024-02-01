fetch('https://api.nasa.gov/planetary/apod?api_key=hrVSbl9GRkS9mNuy1pungArLHuYovWJg5eXHAf5w')
    .then(response => response.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.url})`;
    })
    .catch(error => console.error('Error:', error));

// check if 

