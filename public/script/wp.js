var url =
  "https://wati-integration-prod-service.clare.ai/v2/watiWidget.js?61180";
var s = document.createElement("script");
s.type = "text/javascript";
s.async = true;
s.src = url;
var options = {
  enabled: true,
  chatButtonSetting: {
    backgroundColor: "#00e785",
    ctaText: "Chat with us",
    borderRadius: "25",
    marginLeft: "0",
    marginRight: "20",
    marginBottom: "20",
    ctaIconWATI: false,
    position: "right",
  },
  brandSetting: {
    brandName: "The Valuation School",
    brandSubTitle: "undefined",
    brandImg: "",
    welcomeText: "Hi there!\nHow can I help you?",
    messageText: "",
    backgroundColor: "#00e785",
    ctaText: "Chat with us",
    borderRadius: "25",
    autoShow: false,
    phoneNumber: "918120812010",
  },
};
s.onload = function () {
  CreateWhatsappChatWidget(options);

  // Mobile override: the widget bakes marginBottom into its CSS once,
  // so a media query is needed to adjust it on screen resize.
  var mobileStyle = document.createElement("style");
  mobileStyle.innerHTML =
    "@media (max-width: 768px) {" +
    "  body .wa-widget-send-button { margin: 0 0 80px 0 !important; }" +
    "  body .wa-chat-box, body .wa-chat-bubble { bottom: 80px !important; }" +
    "}";
  document.head.appendChild(mobileStyle);
};
var x = document.getElementsByTagName("script")[0];
x.parentNode.insertBefore(s, x);
