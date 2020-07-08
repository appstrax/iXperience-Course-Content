console.log("Testing...");

// ES5
function Contact(name, telNumber, email) {
  this.name = name;
  this.telNumber = telNumber;
  this.email = email;
}

// ES6
// class Contact {
//     constructor(name, telNumber, email) {
//         this.name = name;
//         this.telNumber = telNumber;
//         this.email = email;
//     }
// }

// ES6
class UI {
  constructor() {}

  addContact(contact) {
    const contactListElement = document.getElementById("contactList");
    console.log(contactListElement);
    const row = document.createElement("tr");

    // const deleteButton = document.createElement("div");
    // deleteButton.style.cursor = "pointer";
    // deleteButton.addEventListener("click", function (e) {
    //   const deleteButton = target;
    //   const deleteCol = deleteButton.parentElement;
    //   const entireRow = deleteCol.parentElement;
    //   console.log(deleteButton, deleteCol, entireRow);

    //   entireRow.remove();
    // });

    row.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.telNumber}</td>
      <td>${contact.email}</td>
      <td><div class="delete" style="cursor: pointer;">X</div></td>
    `;
    contactListElement.appendChild(row);
  }

  clearInputs() {
    document.getElementById("name").value = "";
    document.getElementById("telNumber").value = "";
    document.getElementById("email").value = "";
  }

  deleteContact(target) {
    console.log(target);
    if (target.className === "delete") {
      const deleteButton = target;
      const deleteCol = deleteButton.parentElement;
      const entireRow = deleteCol.parentElement;
      console.log(deleteButton, deleteCol, entireRow);

      entireRow.remove();

      //   target.parentElement.parentElement.remove();
    }
  }
}

// ES5
// function UI() {}

// UI.prototype.addContact = function(contact) {

// }

// UI.prototype.propertyABC = "123";

/**
  // Another way to write the below:

const submitFn = function (e) {
    e.preventDefault();
    console.log("Submitting!");
}

const contactFormElement = document.getElementById("contactForm");
console.log(contactFormElement);
contactFormElement.addEventListener("submit", submitFn);
 */

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("Submitting!");

  const nameElement = document.getElementById("name");
  const telNumberElement = document.getElementById("telNumber");
  const emailElement = document.getElementById("email");
  console.log(nameElement, telNumberElement, emailElement);

  const name = nameElement.value;
  const telNumber = telNumberElement.value;
  const email = emailElement.value;
  console.log(name, telNumber, email);

  const contact = new Contact(name, telNumber, email);
  console.log(contact);

  const ui = new UI();
  ui.addContact(contact);
  ui.clearInputs();
});

document.getElementById("contactList").addEventListener("click", function (e) {
  const ui = new UI();
  ui.deleteContact(e.target);
  e.preventDefault();
});
