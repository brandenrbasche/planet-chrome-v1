// console.log('backgorund js');

// let microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
// let oneWeekAgo = new Date().getTime() - microsecondsPerWeek;


// chrome.history.search({text: '', startTime: oneWeekAgo}, function (historyItems) {
//     console.log('logging history items: ', historyItems);
// });
// const currentTabText = document.getElementById('currentTab');

// chrome.webRequest.onCompleted.addListener(
//     function(details) {
//         // currentTabText.innerText = 'testing';
//       // Check if the status code is 404 (Not Found)
//       if (details.statusCode === 404) {
//         // Notify the user or perform any desired action
//         console.log('404 Error Detected:');
//         currentTabText.innerText = 'error!';
//       }
//     },
//     // Filter object to specify which requests to observe
//     { urls: ['<all_urls>'] },
//   );