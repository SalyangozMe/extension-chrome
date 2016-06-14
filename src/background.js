var server = "http://salyangoz.me";

function postToSalyangoz(title, url, token, id, callback) {
  var data = new FormData();
  data.append('id', id);
  data.append('token', token);
  data.append('title', title);
  data.append('url', url);
  fetch(server + "/api/v1/post/add", {
    method: 'post',
    body: data,
    credentials: 'include'
  })
    .then(function (response) {
      return response.json()
    })
    .then(function (response) {
      if (response.success) {
        callback()
      }
    })
}

var sharer = function () {
  alert("Unable to share!")
};

var _extensionPort;
chrome.runtime.onConnect.addListener(function (port) {
  _extensionPort = port;
  port.onMessage.addListener(function (msg) {
    if (msg.message == "shareWithSalyangoz") {
      sharer()
    }
  });
});

chrome.browserAction.onClicked.addListener(function (tab) {
  if (tab.url.match(/^ftp\:|^javascript\:|^data\:/)) {
    alert("This URL is not a good thing to share.")
    return;
  }
  if (tab.url.match(/^https?\:\/\/([a-z]+\.)?salyangoz\.me(\/.*)?/)) {
    alert("Sharing Salyangoz in Salyangoz would be Salyangozception.\n\nThis is not cool.")
    return;
  }
  if (tab.url.match(/^https?\:\/\/localhost[/:]?/)) {
    alert("Sharing your localhost? Not a good idea.")
    return;
  }
  if (tab.url.match(/^chrome\-/)) {
    alert("Woot. Are you serious?")
    return;
  }
  fetch(server + "/api/v1/token", {credentials: 'include'})
    .then(function (response) {
      return response.json()
    })
    .then(function (response) {
      if (response && response.status && response.token && response.id) {
        chrome.tabs.insertCSS({file: "src/salyangoz.css"});
        chrome.tabs.executeScript({file: "src/salyangoz.js"});

        sharer = function () {
          postToSalyangoz(tab.title, tab.url, response.token, response.id, function () {
            _extensionPort.postMessage({message: "salyangozIsShared"})
          })
        }
      } else {
        chrome.tabs.create({url: server + "/"})
      }
    })
});

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    chrome.tabs.create({
      url: server + "/recent"
    });
  }
});
