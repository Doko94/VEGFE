document.addEventListener("DOMContentLoaded", function() {
    // 🔹 Verifica si existe un formulario antes de usarlo
    let form = document.querySelector("form");

    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            console.log("Formulario enviado correctamente.");
        });
    } else {
        console.warn("⚠️ No hay formulario en la página. Código de formulario omitido.");
    }

    // 🔹 Manejo de la barra de búsqueda
    const search = document.getElementById('search');
    const searchBar = document.getElementById('searchBar');

    if (search && searchBar) {
        search.addEventListener('click', function () {
            searchBar.classList.toggle('show');
            searchBar.classList.toggle('hide');
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && searchBar.classList.contains('show')) {
                searchBar.classList.toggle('show');
                searchBar.classList.toggle('hide');
            }
        });
    } else {
        console.warn("⚠️ Elementos de búsqueda no encontrados. Código de búsqueda omitido.");
    }

    // 🔹 Función de validación de email (Solo si existe el campo)
    const emailField = document.getElementById('email');
    const msgField = document.getElementById('msg');

    function criteria() { 
        if (!emailField || !msgField) {
            console.warn("⚠️ Campo de email no encontrado. Función 'criteria' omitida.");
            return;
        }

        const validChars = ['.', '@', '_', '-'];
        let email = emailField.value.trim().toLowerCase();
        let firstAt = email.indexOf('@');
        let lastAt = email.lastIndexOf('@');
        let lastDot = email.lastIndexOf('.');
        let firstChar = email.charAt(0);
        let state = true;

        msgField.innerHTML = '';

        if (firstChar == '@' || firstChar == '.' || firstChar == '_' || firstChar == '-' || !isNaN(firstChar)) {
            msgField.innerHTML = "❌ Email no puede comenzar con un carácter especial o número.";
            state = false;
        } else if (email.length < 8) {
            msgField.innerHTML = "❌ El email es demasiado corto.";
            state = false;
        } else if ((firstAt < 2) || (firstAt !== lastAt)) {
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
                if ((charCode >= 97 && charCode <= 122) || (charCode >= 48 && charCode <= 57) || validChars.includes(email[i])) {
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
});

