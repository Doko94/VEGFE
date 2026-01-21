document.addEventListener("DOMContentLoaded", function () {
  // 🔹 Verifica si existe un formulario antes de usarlo
  let form = document.querySelector("form");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      console.log("Formulario enviado correctamente.");
    });
  } else {
    console.warn("⚠️ No hay formulario en la página. Código de formulario omitido.");
  }

  // 🔹 Manejo de la barra de búsqueda
  const search = document.getElementById("search");
  const searchBar = document.getElementById("searchBar");

  if (search && searchBar) {
    search.addEventListener("click", function () {
      searchBar.classList.toggle("show");
      searchBar.classList.toggle("hide");
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && searchBar.classList.contains("show")) {
        searchBar.classList.toggle("show");
        searchBar.classList.toggle("hide");
      }
    });
  } else {
    console.warn("⚠️ Elementos de búsqueda no encontrados. Código de búsqueda omitido.");
  }

  // 🔹 Animación logos clientes al entrar en pantalla (sec-4)
  const clientesSection = document.querySelector("#sec-4");
  const logoItems = document.querySelectorAll("#sec-4 .logo-item");

  if (clientesSection && logoItems.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          // Activa animación en cascada
          logoItems.forEach((el) => el.classList.add("is-visible"));

          // ✅ BONUS: Hint sutil de scroll horizontal (solo una vez)
          const track = document.querySelector("#sec-4 .logo-track");
          if (track) {
            track.scrollLeft = 0;
            setTimeout(() => { track.scrollLeft = 50; }, 250);
            setTimeout(() => { track.scrollLeft = 0; }, 650);
          }

          // Solo una vez (evita re-animar al subir/bajar)
          observer.disconnect();
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(clientesSection);
  } else {
    console.warn(
      "⚠️ Sección #sec-4 o .logo-item no encontrados. Animación de logos omitida."
    );
  }
});

// 🔹 Función de validación de email (GLOBAL, por si la llamas desde HTML)
function criteria() {
  const emailField = document.getElementById("email");
  const msgField = document.getElementById("msg");

  if (!emailField || !msgField) {
    console.warn("⚠️ Campo de email no encontrado. Función 'criteria' omitida.");
    return;
  }

  const validChars = [".", "@", "_", "-"];
  let email = emailField.value.trim().toLowerCase();
  let firstAt = email.indexOf("@");
  let lastAt = email.lastIndexOf("@");
  let lastDot = email.lastIndexOf(".");
  let firstChar = email.charAt(0);
  let state = true;

  msgField.innerHTML = "";

  if (
    firstChar == "@" ||
    firstChar == "." ||
    firstChar == "_" ||
    firstChar == "-" ||
    !isNaN(firstChar)
  ) {
    msgField.innerHTML =
      "❌ Email no puede comenzar con un carácter especial o número.";
    state = false;
  } else if (email.length < 8) {
    msgField.innerHTML = "❌ El email es demasiado corto.";
    state = false;
  } else if (firstAt < 2 || firstAt !== lastAt) {
    msgField.innerHTML = "❌ Error en el uso del '@'.";
    state = false;
  } else if (lastDot - lastAt < 3) {
    msgField.innerHTML = "❌ Error en el dominio del email.";
    state = false;
  } else if (email.length - lastDot < 3) {
    msgField.innerHTML = "❌ Error en la extensión del email.";
    state = false;
  } else {
    for (let i = 0; i < email.length && state; i++) {
      let charCode = email.charCodeAt(i);
      if (
        (charCode >= 97 && charCode <= 122) || // a-z
        (charCode >= 48 && charCode <= 57) || // 0-9
        validChars.includes(email[i])
      ) {
        continue;
      } else {
        msgField.innerHTML = "❌ Usa caracteres válidos en el email.";
        state = false;
        break;
      }
    }
  }

  if (state) {
    msgField.innerHTML = "✅ Email válido. Gracias por tu mensaje.";
    emailField.classList.remove("invalid");
  } else {
    emailField.classList.add("invalid");
  }
}
