const BASE_URL = "./data/";

const getUser = async (id) => {
  try {
    const resUsers = await axios.get(`${BASE_URL}/user.json`);
    const users = resUsers.data;
    users.map((u) => {
      if (id == u.id) {
        const pictureUser = Array.from(
          document.getElementsByClassName("user-picture")
        );
        pictureUser.map((p) => {
          p.src = `./img/user/${u.picture}`;
        });
      }
    });
    return users;
  } catch (e) {
    console.error(e);
  }
};

const getContact = async (contact) => {
  let action = Array.from(document.getElementsByClassName("action-chat"));
  action.map((a) => {
    if (a.getAttribute("data-contact") != contact) {
      a.childNodes[1].classList.remove("bg-light");
    }
  });
  try {
    const resUsers = await axios.get(`${BASE_URL}/user.json`);
    const users = resUsers.data;
    users.map((u) => {
      if (contact == u.id) {
        const pictureContact = Array.from(
          document.getElementsByClassName("contact-picture")
        );
        const nameContact = Array.from(
          document.getElementsByClassName("contact-name")
        );
        pictureContact.map((p) => {
          p.src = `./img/user/${u.picture}`;
        });
        nameContact.map((n) => {
          n.innerHTML = `${u.first_name} ${u.last_name}`;
        });
      }
    });

    return users;
  } catch (e) {
    console.error(e);
  }
};

const getMessages = async (user, contact) => {
  let textOptions = `<div class="message-options inline">
      <button class="btn btn-link p-0 mx-1" type="button" data-toggle="tooltip" data-placement="top" title="Reaccionar">
        <i class="far fa-smile text-muted"></i>
      </button>
      <button class="btn btn-link p-0 mx-1" type="button" data-toggle="tooltip" data-placement="top" title="Responder">
        <i class="fas fa-reply text-muted"></i>
      </button>
      <button class="btn btn-link p-0 mx-1" type="button" data-toggle="tooltip" data-placement="top" title="Más">
        <i class="fas fa-ellipsis-h ml-2 text-muted"></i>
      </button>
    </div>`;
  let mediaOptions = `<div class="message-options inline">
    <button class="btn btn-link p-0 mx-1 text-muted" type="button" data-toggle="tooltip" data-placement="top" title="Reenviar">
      <i class="far fa-share-square"></i>
    </button>
  </div>`;
  let pictureSharedBody = document.getElementById("picture-shared-body");
  let filesSharedBody = document.getElementById("files-shared-body");

  try {
    const resUsers = await axios.get(`${BASE_URL}/user.json`);
    const resChats = await axios.get(`${BASE_URL}/chat.json`);
    const users = resUsers.data;
    const chats = resChats.data;

    $(".message-user").remove();
    $(".message-contact").remove();
    $(".picture-shared").remove();
    $(".file-shared").remove();

    getContact(contact);

    let chat = document.getElementById("chat");
    document.getElementById("picture-shared").classList.add("d-none");
    document.getElementById("files-shared").classList.add("d-none");

    chats.map((c) => {
      if (user == c.from && contact == c.to && c.content != undefined) {
        users.map((u) => {
          if (u.id == c.from) {
            switch (c.type) {
              case "image":
                chat.insertAdjacentHTML(
                  "beforeend",
                  `<li class="list-group-item border-0 message-contact">
                    <div class="row pl-3">
                      <div class="inline mr-3">
                        <img
                          src="${c.content}"
                          alt=""
                          height="315"
                        />
                      </div>
                      ${mediaOptions}
                    </div>
                  </li>`
                );
                pictureSharedBody.insertAdjacentHTML(
                  "beforeend",
                  `<div class="col-4 p-1 picture-shared">
                    <img
                      class="img-fluid"
                      src="${c.content}"
                      alt=""
                    />
                  </div>`
                );
                document
                  .getElementById("picture-shared")
                  .classList.remove("d-none");
                break;
              case "video":
                chat.insertAdjacentHTML(
                  "beforeend",
                  `<li class="list-group-item border-0 message-contact">
                    <div class="row pl-3">
                      <div class="inline mr-3">
                        <iframe
                          width="560"
                          height="315"
                          src="https://www.youtube.com/embed/${c.content}"
                          frameborder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        ></iframe>
                      </div>
                      ${mediaOptions}
                    </div>
                  </li>`
                );
                break;
              case "file":
                let file_name = c.content.split("/");
                chat.insertAdjacentHTML(
                  "beforeend",
                  `<li class="list-group-item border-0 message-contact">
                      <div class="row pl-3">
                        <div class="inline mr-3">${
                          file_name[file_name.length - 1]
                        }</div>
                        ${textOptions}
                      </div>
                    </li>`
                );
                filesSharedBody.insertAdjacentHTML(
                  "beforeend",
                  `<li class="list-group-item border-0 file-shared">
                  <div class="row">
                    <div class="col files">
                    <i class="far fa-file-pdf"></i>${
                      file_name[file_name.length - 1]
                    }</div>
                  </div>
                </li>`
                );
                document
                  .getElementById("files-shared")
                  .classList.remove("d-none");
                break;
              default:
                chat.insertAdjacentHTML(
                  "beforeend",
                  `<li class="list-group-item border-0 message-contact">
                    <div class="row pl-3">
                      <div class="inline mr-3">${c.content}</div>
                      ${textOptions}
                    </div>
                  </li>`
                );
                break;
            }
          }
        });
      }
      if (user == c.to && contact == c.from && c.content != undefined) {
        users.map((u) => {
          if (u.id == c.from) {
            switch (c.type) {
              case "image":
                chat.insertAdjacentHTML(
                  "beforeend",
                  `<li class="list-group-item border-0 message-user">
                    <div class="row pr-3">
                      ${mediaOptions}
                      <div class="inline mr-0">
                        <img
                          src="${c.content}"
                          alt=""
                          height="315"
                        />
                      </div>
                    </div>
                  </li>`
                );
                pictureSharedBody.insertAdjacentHTML(
                  "beforeend",
                  `<div class="col-4 p-1 picture-shared">
                    <img
                      class="img-fluid"
                      src="${c.content}"
                      alt=""
                    />
                  </div>`
                );
                document
                  .getElementById("picture-shared")
                  .classList.remove("d-none");
                break;
              case "video":
                chat.insertAdjacentHTML(
                  "beforeend",
                  `<li class="list-group-item border-0 message-user">
                    <div class="row pr-3">
                      ${mediaOptions}
                      <div class="inline mr-3">
                        <iframe
                          width="560"
                          height="315"
                          src="https://www.youtube.com/embed/${c.content}"
                          frameborder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        ></iframe>
                      </div>
                    </div>
                  </li>`
                );
                break;
              case "file":
                let file_name = c.content.split("/");
                chat.insertAdjacentHTML(
                  "beforeend",
                  `<li class="list-group-item border-0 message-user">
                    <div class="row pr-3">
                    ${textOptions}
                      <div class="inline mr-0">${
                        file_name[file_name.length - 1]
                      }</div>
                    </div>
                  </li>`
                );
                filesSharedBody.insertAdjacentHTML(
                  "beforeend",
                  `<li class="list-group-item border-0 file-shared">
                  <div class="row">
                    <div class="col files">
                    <i class="far fa-file-pdf"></i>${
                      file_name[file_name.length - 1]
                    }</div>
                  </div>
                </li>`
                );
                document
                  .getElementById("files-shared")
                  .classList.remove("d-none");
                break;
              default:
                chat.insertAdjacentHTML(
                  "beforeend",
                  `<li class="list-group-item border-0 message-user">
                    <div class="row pr-3">
                      ${textOptions}
                      <div class="inline mr-0">${c.content}</div>
                    </div>
                  </li>`
                );
                break;
            }
          }
        });
      }
    });

    return users;
  } catch (e) {
    console.error(e);
  }
};

const getChats = async (user) => {
  const chatsList = [];
  try {
    const chatsContainer = document.getElementsByClassName("chats-group")[0];
    const resUsers = await axios.get(`${BASE_URL}/user.json`);
    const resChat = await axios.get(`${BASE_URL}/chat.json`);
    const users = resUsers.data;
    const chats = resChat.data;
    chats.map((c) => {
      if (user == c.to && c.content != undefined) {
        chatsList[c.from] = {
          user: c.from,
          content: c.content,
          view: c.view,
          date: c.date,
          type: c.type,
        };
      } else if (user == c.from && c.content != undefined) {
        chatsList[c.to] = {
          user: c.to,
          content: c.content,
          view: c.view,
          date: c.date,
          type: c.type,
        };
      }
    });
    chatsList.map((c, i) => {
      let first_name;
      let last_name;
      users.map((u) => {
        if (u.id == i) {
          first_name = u.first_name;
          last_name = u.last_name;
        }
      });
      let preview =
        c.type != "text"
          ? `${first_name} envió un archivo adjunto.`
          : c.content;
      chatsContainer.insertAdjacentHTML(
        "beforeend",
        `<a class="action-chat" href="#" data-user="${user}" data-contact="${i}">
          <div class="media my-2 p-2 text-dark contact-chat">
              <img
                class="rounded-circle mr-2"
                src="./img/user/${i}.jpg"
                alt="user-picture"
                height="46.5"
              />
              <div class="media-body">
                <h6 class="m-0 inline-block">${first_name} ${last_name}</h6>
                <div class="text-muted">
                  ${preview}
                  <span> · ${c.date}</span>
                </div>
              </div>
              <span class="float-right" display="${c.view}">
                  <img
                    class="rounded-circle"
                    src="./img/user/${i}.jpg"
                    alt="user-picture"
                    height="16"
                /></span>
            </div>
          </div>
        </a>`
      );
    });
    let action = Array.from(document.getElementsByClassName("action-chat"));
    action.map((a) => {
      a.addEventListener("click", () => {
        a.childNodes[1].classList.add("bg-light");
        getMessages(
          a.getAttribute("data-user"),
          a.getAttribute("data-contact")
        );
      });
    });

    document.getElementsByClassName("action-chat")[0].click();
    return chats;
  } catch (e) {
    console.error(e);
  }
};

const messengerInit = (user) => {
  $(".action-chat").remove();
  getUser(user);
  getChats(user);
};

messengerInit(1);
