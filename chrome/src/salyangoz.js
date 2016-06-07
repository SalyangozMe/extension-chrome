// Open port to Chrome extension.
var port = chrome.extension.connect();

(function () {

  if (document.getElementById("Salyangoz-Extension")) {
    // If any other Salyangoz item exists on page, do not run.
    return;
  }

  // Create and append loading bar.
  var salyangozContainer = document.createElement('div');
  salyangozContainer.id = "Salyangoz-Extension";
  salyangozContainer.className = "Salyangoz";
  salyangozContainer.innerHTML = `
    <div class="SalyangozContent">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48" height="48" viewBox="0 0 48 48">
        <path d="M4.031 31.969v-3.938h15.938v3.938h-15.938zM36 28.031h7.969v3.938h-7.969v8.063h-4.031v-8.063h-7.969v-3.938h7.969v-8.063h4.031v8.063zM28.031 12v4.031h-24v-4.031h24zM28.031 19.969v4.031h-24v-4.031h24z"></path>
      </svg> Added
    </div>
  `;
  document.body.appendChild(salyangozContainer);

  function removeContainer() {
    setTimeout(function () {
      document.body.removeChild(salyangozContainer);
    }, 700)
  }

  // Send message to active page that they can share the actual page with Salyangoz.
  port.postMessage({
    message: "shareWithSalyangoz"
  });

  port.onMessage.addListener(function (msg) {
    // If salyangoz is shared, remove the loading bar.
    if (msg.message === "salyangozIsShared") {
      removeContainer();
    }
  });

})();
