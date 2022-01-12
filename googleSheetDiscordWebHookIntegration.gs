// Simple Option Menu - If you want to use a button to force activate your functions
// function onOpen() {
//   var ui = SpreadsheetApp.getUi();
//   ui.createMenu('Script Tools')
//       .addItem('Post Update', 'postUpdate')
//       .addToUi();
// }


function postUpdate() {
// These are configuration for the discord embed
//
var embedTitle = 'Title';
var embedDesc = 'Description is here';
var embedLink = '<link goes here>';
var discWebHook = '<webhook goes here>';

var options = {
  'method' : 'post',
  "headers": {
    "Content-Type": "application/json",
    },
  'payload' : JSON.stringify({
    'content' : '',
    'embeds' : [{
        'title' : embedTitle,
        // This link is in the embed, it will link back to the google sheet
        'url' : embedLink,
        'description' : embedDesc
    }]
  })
}
// This is what sends the request to the webhook link with the options json
UrlFetchApp.fetch(discWebHook, options);
return "Success"
}

// Below code is taken and modified from this link
// https://stackoverflow.com/questions/62105238/debounce-or-throttle-event-handler-in-google-apps-script

function handleChangeOrEdit(event) {
  var eventId = Utilities.getUuid();
  setEventTriggerWinner(eventId);
  Utilities.sleep(30000);   // Wait to see if another Change/Edit event is triggered
  if (getEventTriggerWinner() == eventId) {
    Logger.log(`Trigger Winner: ${eventId}`);
    postUpdate();
  }
}

function setEventTriggerWinner(value) {
  // Wrapping setProperty in a Lock probably isn't necessary since a set should be atomic
  // but just in case...
  var lock = LockService.getScriptLock();
  if (lock.tryLock(5000)) {
    PropertiesService.getScriptProperties().setProperty("eventTriggerWinner", value);
    lock.releaseLock();
  }
}

function getEventTriggerWinner() {
  return PropertiesService.getScriptProperties().getProperty("eventTriggerWinner");
}
