var server = "https://salyangoz.me";

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

function loginAndShare(tab) {
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
}

chrome.browserAction.onClicked.addListener(function (tab) {
  loginAndShare(tab)
});

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    chrome.tabs.create({
      url: server + "/recent"
    })
  }
})

chrome.contextMenus.create({
  title: "Share on Salyangoz",
  contexts: ["page", "link"],
  onclick: function (ctx) {
    var url = ctx.linkUrl || ctx.pageUrl
    loginAndShare({url: url})
  }
})

var nId
setInterval(function () {
  var now = new Date()
  var date = new Date(localStorage.getItem('notification-shown'))

  var hours = ((now - date) / 1000 / 60 / 60 / 24)
  if (hours < 24) {
    return
  }

  fetch(server + "/popular.json").then(function (response) {
    return response.json()
  }).then(function (response) {
    chrome.notifications.create("salyangoz-popular", {
      type: "list",
      title: "What's popular on Salyangoz?",
      message: "",
      iconUrl: "https://salyangoz.me/icon.png",
      items: response.posts.splice(0, 5).map(function (post) {
        return {title: "• " + post.title, message: "— @" + post.user.user_name}
      }),
      buttons: [
        {title: "View all popular links..."},
      ]
    }, function (id) {
      nId = id
    })
    localStorage.setItem('notification-shown', new Date())
  })
}, 60 * 1000)

chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
  if (notifId === nId) {
    chrome.notifications.clear(nId)
    if (btnIdx === 0) {
      window.open("http://salyangoz.me/popular")
    }
  }
});
