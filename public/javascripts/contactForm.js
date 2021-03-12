const form = document.querySelector(".contact_form");
const modal = document.querySelector("#modalButton");

let name = document.getElementById("contact_name");
let email = document.getElementById("contact_email");
let subject = document.getElementById("contact_subject");
let message = document.getElementById("contact_message");

let fields = [name, email, subject, message];


const formSubmit = async e => {
    e.preventDefault();
    
    for (let field of fields) {
        // Validate the email
        if (field.type == "email") {
            if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(field.value))) {
                form.removeEventListener("submit", formSubmit);
                form.addEventListener("submit", formSubmit);
                return;
            }
        }
        // Check if any of the fields are empty
        if (field.value == "") {
            form.removeEventListener("submit", formSubmit);
            form.addEventListener("submit", formSubmit);
            return;
        }
    }
    
    let mail = new FormData(form);
    await sendMail(mail);
}

const sendMail = mail => {
    // CHANGE ONCE IT IS UP AND RUNNING
    fetch("http://localhost:3000/contact", {
        method: "post",
        body: mail,   
    }).then((response) => {
        if (response.status == 200) {
            // If the message was successfully sent - reset form, remove validation class and click button to display modal.
            form.reset();
            form.classList.remove("was-validated");
            modal.click();
        }
        return response.json();
    });
};

const formEvent = form.addEventListener("submit", formSubmit);