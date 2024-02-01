const spaceContainer = document.getElementsByClassName('space-container');

// let microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
// let oneWeekAgo = new Date().getTime() - microsecondsPerWeek;


// chrome.history.search({text: '', startTime: oneWeekAgo}, function (historyItems) {
//     console.log('logging history items: ', historyItems);
// });

document.addEventListener('DOMContentLoaded', () => {
    const zeroGButton = document.getElementById('zeroGToggle');
    let zeroG = false;

    async function getCurrentTab() {
        let queryOptions = {active: true, lastFocusedWindow: true};
        let [tab] = await chrome.tabs.query(queryOptions);
        return tab;
    }

    let currentTab = getCurrentTab();
    console.log('logging current tab: ', currentTab.then(data => data.url).catch(e => console.log('error: ', e)));
    // console.log('logging current tab: ', getCurrentTab().then(data => { return data.url }).catch(e => console.log('error: ', e)));
    // let activeTab = chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //     return tabs[0].id;
    // });
    // let activeTab = chrome.tabs.getCurrent();

    // console.log('logging active tab: ', activeTab);

    // zeroGButton.addEventListener('click', (e) => {
    //     zeroG = true;
    //     if (zeroG) {
    //         console.log('toggled zero g');
    //         let divs = document.querySelectorAll('*');
    //         divs.forEach(allElements => {
    //             allElements.style.animation = 'space-man-float 5s infinite ease-in-out';
    //         })
            
    //         // chrome.scripting
    //         //     .insertCSS({
    //         //         target: { tabId: activeTab },
    //         //         files: ['zeroGstyles.css']
    //         //     })
    //         //     .then(() => console.log('css injected!'));
    //     } else zeroG = false;
    // })
})


// TODO: UNCOMMENT ME!

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
            // spaceContainer.style.backgroundImage = `url(${data.url})`;
        } else {
            console.log('NASA Picture of the Day error.');
            // set a default image
            spaceContainer.style.backgroundImage = 'url(assets/default.jpg)';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // set a default image 
        spaceContainer.style.backgroundImage = 'url(assets/default.jpg)';
    });

// // oxygen functionality 

// // countdown timer (working)

let oxygenLevel = 50; // start with a full tank
let translateInterval = 0;
let translateIntervalUp = 0;
let decreaseInterval = null;
let increaseInterval = null;
let oxygenMeterDiv = document.getElementById('oxygenMeterDiv');
let oxygenMeterText = document.getElementById('oxygenLevel');
let astroman = document.getElementById('astroman');

function decreaseOxygen() {
    // setTimeout(this.boundOxygenWidth);
    setTimeout(this.boundOxygenWidth, 500)
    if (oxygenLevel > 0) {
        oxygenLevel--;
        setOxygenColor();
        translateIntervalUp = 0;
        oxygenMeterDiv.setAttribute('style', `width: ${oxygenLevel}%; transition: .5s ease-in-out;`);
        // astroman.setAttribute('style', `margin-top: ${translateInterval += 5}px; transition: .5s ease-in-out;`);
        astroman.setAttribute('style', `margin-top: ${translateInterval += 1}vh; transition: .5s ease-in-out;`)
    } else {
        clearInterval(decreaseInterval); // stop decreasing when oxygen level reaches 0
    }
    document.getElementById('oxygenLevel').textContent = `Oxygen level: ${oxygenLevel}`;
}

function increaseOxygen() {
    // setTimeout(this.boundOxygenWidth);
    if (oxygenLevel < 100) {
        oxygenLevel ++;
        setOxygenColor();
        translateInterval = 0;
        oxygenMeterDiv.setAttribute('style', `width: ${oxygenLevel}%; transition: .5s ease-in-out;`);
        // astroman.setAttribute('style', `margin-bottom: ${translateIntervalUp += 5}px; transition: .5s ease-in-out;`)
        astroman.setAttribute('style', `margin-bottom: ${translateIntervalUp += 1}vh; transition: .5s ease-in-out;`)
    } else return;
}

function setOxygenColor() {
    if (oxygenLevel >= 50) oxygenMeterText.setAttribute('style', 'color: green;');
    else if (oxygenLevel < 50 && oxygenLevel >= 25) oxygenMeterText.setAttribute('style', 'color: rgb(212, 205, 0)');
    else oxygenMeterText.setAttribute('style', 'color: red');
}

this.boundOxygenWidth = () => {
    if (oxygenLevel <= 0) return;
    else return decreaseOxygen();
}

document.addEventListener('keydown', function() {
    oxygenLevel++;
    increaseOxygen();
    // setTimeout(increaseOxygen, 10);
    if (oxygenLevel > 100) oxygenLevel = 100; // limit the oxygen level to 100
    document.getElementById('oxygenLevel').textContent = `Oxygen level: ${oxygenLevel}`;
    document.getElementById('oxygenLevel').style.width = oxygenLevel;
    if (decreaseInterval) {
        clearInterval(decreaseInterval); // stop decreasing when a key is pressed
    }
    decreaseInterval = setInterval(decreaseOxygen, 1000); // start decreasing after 1 second
});

decreaseInterval = setInterval(decreaseOxygen, 1000); // start decreasing immediately
// increaseInterval = setInterval(increaseOxygen, 1000);

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