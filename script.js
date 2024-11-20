document.addEventListener("DOMContentLoaded", () => {
    const nameForm = document.getElementById("nameForm");
    const downloadLink = document.getElementById("downloadLink");
    const welcome = document.getElementById("welcome");
    const userTable = document.getElementById("userTable");

    // Page daccueil
    if (nameForm) {
        nameForm.addEventListener("submit", (e) => {
            e.preventDefault(); 
            const name = document.getElementById("name").value.trim();

            if (name) {
                localStorage.setItem(name, JSON.stringify({ downloaded: false })); 
                window.location.href = "download.html"; 
            } else {
                alert("Veuillez entrer un nom valide !");
            }
        });
    }

    // Page download
    if (downloadLink && welcome) {
        const name = Object.keys(localStorage).find(
            (key) => JSON.parse(localStorage[key]).downloaded === false
        );

        if (name) {
            welcome.textContent = `Bienvenue, ${name} !`;
            downloadLink.addEventListener("click", () => {
                const userData = JSON.parse(localStorage.getItem(name));
                userData.downloaded = true;
                localStorage.setItem(name, JSON.stringify(userData)); 
                setTimeout(() => {
                    window.location.href = "merci.html";
                }, 500);
            });
        } else {
            window.location.href = "index.html";
        }
    }

    // Page admin
    if (userTable) {
        const tbody = userTable.querySelector("tbody");
        Object.keys(localStorage).forEach((name) => {
            const userData = JSON.parse(localStorage[name]);
            const row = document.createElement("tr");
            row.innerHTML = `<td>${name}</td><td>${userData.downloaded ? "Oui" : "Non"}</td>`;
            tbody.appendChild(row);
        });
    }
});
