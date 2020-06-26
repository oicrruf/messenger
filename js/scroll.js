const adjustScreen = () => {
  const navHeight = document.getElementsByClassName(
    "navbar navbar-expand-lg navbar-light"
  )[0].offsetHeight;
  const browserHeight = window.innerHeight;
  const chatForm = document.getElementById("chat-form");
  const chatBar = document.getElementById("chat-bar");
  const chat = document.getElementById("chat");
  const infoConversation = document.getElementById("info-conversation");
  const conatinerChat = document.getElementsByClassName(
    "col-lg-8 border-right"
  )[0];
  const conatinerChatWidth = document.getElementsByClassName(
    "col-lg-8 border-right"
  )[0].offsetWidth;
  chatBar.setAttribute("style", `height: ${browserHeight - navHeight - 1}px`);
  chat.setAttribute(
    "style",
    `height: ${browserHeight - navHeight - chatForm.offsetHeight - 1}px`
  );
  infoConversation.setAttribute(
    "style",
    `height: ${browserHeight - navHeight - 1}px`
  );
  conatinerChat.setAttribute(
    "style",
    `height: ${browserHeight -  chatForm.offsetHeight - 1}px`
  );
  chatForm.setAttribute("style", `width: ${conatinerChatWidth}px`);
  new PerfectScrollbar(chatBar);
  new PerfectScrollbar(conatinerChat);
  new PerfectScrollbar(infoConversation);
};

window.addEventListener("resize", adjustScreen);
adjustScreen();
