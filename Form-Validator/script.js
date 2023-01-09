const form = document.getElementById('form');
const pass1El = document.getElementById('password1');
const pass2El = document.getElementById('password1');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');

let isValid = false;
let passwordsMatch = false;

function validateForm() {
  isValid = form.checkValidity();

  if (!isValid) {
    message.textContent = 'Please, fill out all filds.';
    message.style.color = 'red';
    messageContainer.style.borderColor = 'red';
    return;
  }

  if (pass1El.value === pass2El.value) {
    passwordsMatch = true;
    pass1El.style.borderColor = 'green';
    pass2El.style.borderColor = 'green';
  } else {
    passwordsMatch = false;
    message.textContent = 'Make sure passwords match.';
    message.style.color = 'red';
    messageContainer.style.borderColor = 'red';
    pass1El.style.borderColor = 'red';
    pass2El.style.borderColor = 'red';
    return;
  }

  if (isValid && passwordsMatch) {
    message.textContent = 'Successfully Registered!';
    message.style.color = 'green';
    messageContainer.style.borderColor = 'green';
  }
}

function storeFormData() {
  const user = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    website: form.website.value,
    password: form.password.value,
  };

  console.log(user);
}

function processFormData(e) {
  e.preventDefault();
  validateForm();

  if (isValid && passwordsMatch) {
    storeFormData();
  }
}

form.addEventListener('submit', processFormData);
