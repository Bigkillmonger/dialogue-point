const form = document.getElementById("contact-form");
const successMessage = document.getElementById("form-success");

if (form && successMessage) {
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {
                form.reset();
                successMessage.hidden = false;
                submitButton.textContent = "Send Inquiry";
            } else {
                alert("Your inquiry could not be submitted. Please try again.");
                submitButton.textContent = "Send Inquiry";
            }
        } catch (error) {
            alert("There was a connection problem. Please try again.");
            submitButton.textContent = "Send Inquiry";
        } finally {
            submitButton.disabled = false;
        }
    });
}


/* Dark mode toggle across all pages */
const themeToggle = document.getElementById("theme-toggle");

// Restore the visitor's saved theme
if (localStorage.getItem("dialogue-point-theme") === "dark") {
    document.body.classList.add("dark-mode");
}

function updateThemeButton() {
    if (!themeToggle) return;

    const isDark = document.body.classList.contains("dark-mode");

    themeToggle.textContent = isDark ? "☀️" : "🌙";
    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
    themeToggle.setAttribute(
        "title",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
}

updateThemeButton();

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        const isDark = document.body.classList.contains("dark-mode");

        localStorage.setItem(
            "dialogue-point-theme",
            isDark ? "dark" : "light"
        );

        updateThemeButton();
    });
}

