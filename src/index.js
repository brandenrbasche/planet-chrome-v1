const currentTabText = document.getElementById('currentTab');

chrome.webRequest.onCompleted.addListener(
    function(details) {
        // currentTabText.innerText = 'testing';
      // Check if the status code is 404 (Not Found)
      if (details.statusCode === 404) {
        // Notify the user or perform any desired action
        console.log('404 Error Detected:');
        currentTabText.innerText = 'error!';
      }
    },
    // Filter object to specify which requests to observe
    { urls: ['<all_urls>'] },
  );


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


