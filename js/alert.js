const theme = document.getElementById("theme-change");
const colors = {
  ["blue"]: "css/themes/blue.css",
  ["aqua"]: "css/themes/aqua.css",
  ["yellow"]: "css/themes/yellow.css",
  ["red"]: "css/themes/red.css",
  ["green"]: "css/themes/green.css",
  ["orange"]: "css/themes/orange.css",
};
const storageTheme = (theme) => {
  let u = parseInt(sessionStorage.getItem("user"));
  let c = parseInt(sessionStorage.getItem("contact"));
  localStorage.setItem(`theme_${u + c}`, theme);
};
const changeTheme = () => {
  Swal.fire({
    html: `
    <h6>Elige el color para esta conversacion</h6>
    <p class="mb-4" style="font-size: 0.9rem">Todas las personas que participan en esta conversación lo verán.</p>
    <a id="blue" class="change-color blue" href="#"><div></div></a>
    <a id="aqua" class="change-color aqua" href="#"><div></div></a>
    <a id="yellow" class="change-color yellow" href="#"><div></div></a>
    <a id="red" class="change-color red" href="#"><div></div></a>
    <a id="green" class="change-color green" href="#"><div></div></a>
    <a id="orange" class="change-color orange" href="#"><div></div></a>
      `,
    showCloseButton: false,
    showConfirmButton: false,
    showCancelButton: true,
    cancelButtonText: "Cancelar",
  });
  let btnColor = Array.from(document.getElementsByClassName("change-color"));
  btnColor.map((c) => {
    c.addEventListener("click", () => {
      document
        .getElementById("theme")
        .setAttribute("href", `${colors[c.getAttribute("id")]}`);
      Swal.close();
      storageTheme(colors[c.getAttribute("id")]);
    });
  });
};
theme.addEventListener("click", changeTheme);
