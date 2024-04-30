/*
const logoutBoton = document.getElementById("logoutBtn");

logoutBoton.addEventListener("click", async (e) => {
    const result = await fetch("http://localhost:8080/api/session/logout", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const {redirect} = await result.json();
    window.location.href = redirect;
});
*/