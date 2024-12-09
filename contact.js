// Hent elementer for passordstyrke
const passwordInput = document.getElementById("signup-password");
const passwordStrength = document.getElementById("password-strength");

// Funksjon for å vurdere passordstyrke
function evaluatePasswordStrength(password) {
    const strengthCriteria = [
        { regex: /.{8,}/, message: "Minst 8 tegn" },
        { regex: /[a-z]/, message: "Minst én liten bokstav" },
        { regex: /[A-Z]/, message: "Minst én stor bokstav" },
        { regex: /[0-9]/, message: "Minst ett tall" },
        { regex: /[^A-Za-z0-9]/, message: "Minst ett spesialtegn" }
    ];

    let strength = 0;
    let messages = [];

    strengthCriteria.forEach(criteria => {
        if (criteria.regex.test(password)) {
            strength++;
        } else {
            messages.push(criteria.message);
        }
    });

    return { strength, messages };
}

// Oppdater styrkeindikator
passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    const { strength, messages } = evaluatePasswordStrength(password);

    passwordStrength.innerHTML = `
        <p>Styrke: ${strength}/5</p>
        ${messages.length > 0 ? `<ul><li>${messages.join("</li><li>")}</li></ul>` : ""}
    `;
    passwordStrength.style.color = strength === 5 ? "green" : "red";
});
