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


// oxygen functionality 

// countdown timer (working)

let oxygenLevel = 100; // start with a full tank
let decreaseInterval = null;

function decreaseOxygen() {
    if (oxygenLevel > 0) {
        oxygenLevel--;
    } else {
        clearInterval(decreaseInterval); // stop decreasing when oxygen level reaches 0
    }
    document.getElementById('oxygenLevel').textContent = `Oxygen level: ${oxygenLevel}`;
}

document.addEventListener('keydown', function() {
    oxygenLevel++;
    if (oxygenLevel > 100) oxygenLevel = 100; // limit the oxygen level to 100
    document.getElementById('oxygenLevel').textContent = `Oxygen level: ${oxygenLevel}`;

    if (decreaseInterval) {
        clearInterval(decreaseInterval); // stop decreasing when a key is pressed
    }
    decreaseInterval = setInterval(decreaseOxygen, 1000); // start decreasing after 1 second
});

decreaseInterval = setInterval(decreaseOxygen, 1000); // start decreasing immediately

// decreasing div width (not working)

// let oxygenLevel = 100; // start with a full tank
// let decreaseInterval = null;

// function decreaseOxygen() {
//     if (oxygenLevel > 0) {
//         oxygenLevel--;
//         document.getElementById('oxygenLevel').style.width = `${oxygenLevel}%`;
//     } else {
//         clearInterval(decreaseInterval); // stop decreasing when oxygen level reaches 0
//     }
// }

// decreaseInterval = setInterval(decreaseOxygen, 1000); // start decreasing immediately

// document.addEventListener('keydown', function() {
//     oxygenLevel++;
//     if (oxygenLevel > 100) oxygenLevel = 100; // limit the oxygen level to 100
//     document.getElementById('oxygenLevel').style.width = `${oxygenLevel}%`;
// });