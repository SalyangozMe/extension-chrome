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
    <div class="SalyangozBar">
      <button class="SalyangozBar_cancel" type="button">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">
          <path d="M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z"></path>
        </svg>
      </button>
      <div class="SalyangozBar_loading"></div>
    </div>
  `;
  salyangozContainer.querySelector('.SalyangozBar_cancel').onclick = removeContainer;
  document.body.appendChild(salyangozContainer);


  function removeContainer() {
    setTimeout(function () {
      salyangozContainer.classList.remove("isSaving")
    }, 20);

    setTimeout(function () {
      document.body.removeChild(salyangozContainer);
    }, 500);

    clearTimeout(delayedShare);
    clearTimeout(animation);
  }


  var delayedShare, animation;

  animation = setTimeout(function () {
    salyangozContainer.classList.add("isSaving");
  }, 20);

  delayedShare = setTimeout(function () {
    // Send message to active page that they can share the actual page with Salyangoz.
    port.postMessage({message: "shareWithSalyangoz"});
  }, 2500);


  port.onMessage.addListener(function (msg) {
    // If salyangoz is shared, remove the loading bar.
    if (msg.message === "salyangozIsShared") {
      removeContainer();
    }
  });

})();
