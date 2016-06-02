//Base urls
var salyangozBaseURL = "http://salyangoz.me";
var salyangozServiceBaseURL = salyangozBaseURL + "/api/v1";

//Website endpoints
var salyangozWelcomeURL = salyangozBaseURL + "/welcome";
var salyangozLoginURL = salyangozBaseURL + "/login";

//Service endpoints
var salyangozServiceTokenFetchURL = salyangozServiceBaseURL + "/token";
var salyangozServiceAddPostURL = salyangozServiceBaseURL + "/post/add";


//Validation error messages
var urlValidationErrorMessageBlankPage = "Sharing a blank page? Not a good idea.";
var urlValidationErrorMessageSuspiciousFile = "This URL is not a good thing to share.";
var urlValidationErrorMessageSalyangozception = "Sharing Salyangoz in Salyangoz would be Salyangozception.\n\nThis is not cool.";
var urlValidationErrorMessageLocalhost = "Sharing your localhost? Not a good idea.";

//Template paths
var salyangozBarTemplatePath = safari.extension.baseURI + "assets/templates/bar.html"

//Other defines
var dataPassMessageName = "messageToBeDeliveredToInjectedScript";

//Commands
var sharePageToSalyangozCommand = "sharePageToSalyangoz";