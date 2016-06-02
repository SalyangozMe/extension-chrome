(function () {

	if (document.getElementById("Salyangoz-Extension")) {
	    return;
	}
	
	var delayedShare, animation, salyangozContainer;

	function appendSalyangoz(){
		salyangozContainer = document.createElement('div');
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
		salyangozContainer.querySelector('.SalyangozBar_cancel').onclick = hideLoading;
		document.body.appendChild(salyangozContainer);
	}

	function hookMessages(){
		safari.self.addEventListener("message", handleMessage, false);
	}

	function handleMessage(msgEvent){
		var messageName = msgEvent.name;
    	var messageData = msgEvent.message;
    	if (messageName === "messageToBeDeliveredToInjectedScript") {
	        if (messageData === "showLoading") {
	            showLoading();
	        }
	        if (messageData === "hideLoading") {
	            hideLoading();
	        }
	    }
	}

	function hideLoading() {
	    setTimeout(function () {
	      salyangozContainer.classList.remove("isSaving")
	    }, 20);
	    clearTimeout(animation);
	}

	function showLoading(){
		animation = setTimeout(function () {
			salyangozContainer.classList.add("isSaving");
		}, 20);
	}

	appendSalyangoz();
	hookMessages();
})();