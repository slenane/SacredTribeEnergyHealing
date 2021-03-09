const form = document.querySelector(".contact_form");

const formEvent = form.addEventListener("submit", (e) => {
    e.preventDefault();
    let mail = new FormData(form);
    sendMail(mail);
})

const sendMail = mail => {
    // CHANGE ONCE IT IS UP AND RUNNING
    fetch("http://localhost:3000/contact", {
        method: "post",
        body: mail,   
    }).then((response) => {
        return response.json();
    });

    // Reset the form values
    form.reset();
};