const signinCheck = (fields) => {
  let tab = Object.keys(fields);
  let errorTab = [];
  // Check if all fields are filled
  let empty = false;
  for (let i = 0; i < tab.length; i++) {
    if (fields[tab[i]] === "") {
      empty = true;
    }
  }
  if (empty === true) {
    errorTab.push("Tous les champs doivent être remplis");
  }

  // Test
  let mailTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    fields.email
  );

  if (mailTest === false) {
    errorTab.push("Email non valide");
  }

  // Password minimum 8 letters
  if (fields.password.length < 8) {
    errorTab.push("Le mot de passe doit faire au moins 8 caractères");
  }
  // Password contains a number
  let regNumber = new RegExp("[0-9]");
  let test = regNumber.test(fields.password);
  if (test === false) {
    errorTab.push("Le mot de passe doit contenir au moins un chiffre");
  }
  // Password contains a UpperCase letter
  let regUpper = new RegExp("[A-Z]");
  let test2 = regUpper.test(fields.password);
  if (test2 === false) {
    errorTab.push("Le mot de passe doit contenir au moins une majuscule");
  }

  let alertMessage = "";
  for (let i = 0; i < errorTab.length; i++) {
    if (i !== 0) {
      alertMessage = `${alertMessage} \n `;
    }
    alertMessage = `${alertMessage}${errorTab[i]}`;
  }
  return alertMessage;
};

module.exports = signinCheck;
