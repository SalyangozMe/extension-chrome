if (!safari.extension.settings.hasRun) {
 	safari.extension.settings.hasRun = true;
	safari.extension.settings.lang = window.navigator.language;
	openURLInNewTab(salyangozWelcomeURL);
}

safari.application.addEventListener("command", performCommand, false);