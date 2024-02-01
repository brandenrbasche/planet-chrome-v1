fetch('https://api.nasa.gov/planetary/apod?api_key=hrVSbl9GRkS9mNuy1pungArLHuYovWJg5eXHAf5w')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.media_type === 'image') {
            document.body.style.backgroundImage = `url(${data.url})`;
        } else {
            console.log('NASA Picture of the Day error.');
            // set a default image
            document.body.style.backgroundImage = 'url(assets/default.jpg)';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // set a default image 
        document.body.style.backgroundImage = 'url(assets/default.jpg)';
    });


    // pull browser history and log to console 