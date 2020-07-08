// ES5 OOP 

// Contact Constructor
function Contact(name, number, email){
  this.name = name;
  this.number = number;
  this.email = email;
}

// UI Constructor
function UI(){

}

UI.prototype.addContact = function(contact){
  const list = document.getElementById('contact-list');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${contact.name}</td>
    <td>${contact.number}</td>
    <td>${contact.email}</td>
    <td><a class="delete" style="cursor: pointer;">x</a></td>
  `;

  list.appendChild(row);
}

UI.prototype.clearFields = function(){
  document.getElementById('name').value = '';
  document.getElementById('number').value = '';
  document.getElementById('email').value = '';
}

UI.prototype.deleteBook = function(target){
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}

// Event Listeners
document.getElementById('contact-form').addEventListener('submit',
  function(e){
    const name = document.getElementById('name').value;
    const number = document.getElementById('number').value;
    const email = document.getElementById('email').value;
    
    const contact = new Contact(name, number, email);
    
    const ui = new UI();
    ui.addContact(contact);
    ui.clearFields();
  
    e.preventDefault();  
});

// Delete Contact
document.getElementById('contact-list').addEventListener('click',
  function(e){
    const ui = new UI();
    ui.deleteBook(e.target);
    e.preventDefault();
});