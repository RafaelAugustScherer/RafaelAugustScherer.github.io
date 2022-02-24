/* Header Form */

const headerFormButton = document.getElementsByClassName('header-form-button')[0];

function validateLogin(evt) {
  evt.preventDefault();
  const emailLogin = document.getElementsByClassName('header-input-email')[0].value;
  const passwordLogin = document.getElementsByClassName('header-input-password')[0].value;

  if (emailLogin === 'tryber@teste.com' && passwordLogin === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}

headerFormButton.addEventListener('click', validateLogin);

/* Generate Rate Input Fields */

function createRateField(field) {
  const div = document.createElement('div');
  const radioButton = document.createElement('input');
  const label = document.createElement('label');

  div.className = 'form-check form-check-inline';
  label.innerText = field;
  label.htmlFor = 'rate';
  label.className = 'form-check-label';
  radioButton.type = 'radio';
  radioButton.name = 'rate';
  radioButton.value = field;
  radioButton.className = 'form-check-input';
  radioButton.checked = field === 1; // field === 1 ? (radioButton.checked = true) : (radioButton.checked = false)
  div.appendChild(radioButton);
  div.appendChild(label);
  return div;
}

function appendRateFields() {
  const rateDiv = document.getElementsByClassName('rate-div')[0];
  const div = document.createElement('div');
  div.className = 'col';
  rateDiv.appendChild(div);

  for (let i = 1; i <= 10; i += 1) {
    const rateField = createRateField(i);
    div.appendChild(rateField);
  }
}
appendRateFields();

/* Handle Agreement Checkbox */

const agreementCheck = document.getElementById('agreement');

function handleAgreement() {
  //* Referência: https://www.w3schools.com/jsref/prop_checkbox_checked.asp */
  //   /* Ref: https://www.w3schools.com/jsref/prop_pushbutton_disabled.asp */
  const submitButton = document.getElementById('submit-btn');
  submitButton.disabled = !agreementCheck.checked; // agreementCheck.checked ? submitButton.disabled = false : submitButton.disabled = true;
}

agreementCheck.addEventListener('change', handleAgreement);

/* Handle Counter */

const commentTextarea = document.getElementById('textarea');

function handleCounter() {
  const counterSpan = document.getElementById('counter');

  // Tamanho máximo - Tamanho do texto atual
  const counterNum = commentTextarea.maxLength - commentTextarea.value.length;

  counterSpan.innerText = counterNum;
}

commentTextarea.addEventListener('keyup', handleCounter);
commentTextarea.addEventListener('keydown', handleCounter);
handleCounter();

/* Process Form Information */

const submitButton = document.getElementById('submit-btn');

function fieldsToText(fields) {
  let checked = '';
  fields.forEach((innerField) => {
    if (innerField.checked && checked !== '') {
      checked += ', ';
    }
    if (innerField.checked) {
      checked += innerField.value;
    }
  });

  return checked;
}

function appendInfo(fields, parent, type) {
  Object.keys(fields).forEach((field) => {
    const elLineInfo = document.createElement('p');
    if (type === 'text') {
      elLineInfo.innerHTML = `${field}: ${document.getElementById(fields[field]).value}`;
    } else {
      const elFields = document.getElementsByName(fields[field]);
      const checked = fieldsToText(elFields);
      elLineInfo.innerHTML = `${field}: ${checked}`;
    }
    parent.appendChild(elLineInfo);
  });
}

function appendName(parent) {
  const name = document.getElementById('input-name').value;
  const surName = document.getElementById('input-lastname').value;

  const elText = document.createElement('p');
  elText.innerHTML = `Nome: ${name} ${surName}`;

  parent.appendChild(elText);
}

function handleForm(evt) {
  evt.preventDefault();
  const postFormSection = document.getElementById('post-form-info');
  postFormSection.innerHTML = '';

  const textFields = {
    Email: 'input-email',
    Casa: 'house',
    Observações: 'textarea',
  };

  const selectFields = {
    Família: 'family',
    Matérias: 'content',
    Avaliação: 'rate',
  };
  appendName(postFormSection);
  appendInfo(textFields, postFormSection, 'text');
  appendInfo(selectFields, postFormSection, 'select');
}

submitButton.addEventListener('click', handleForm);
