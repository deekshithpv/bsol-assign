//Form Elements

const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const emailEle = document.getElementById("email-add");
const phoneNoEle = document.getElementById("phone-no");
const yearEle = document.getElementById("completion-year");
const regBtnEle = document.getElementsByClassName("button-register");

const updateIDVal = localStorage.getItem("updateID");

// Regex values ;
const regexCharactersOnly = /^[a-zA-Z]+$/;
const regexNumSym = /^[0-9!@#\$%\^\&*\)\(+=._-]+$/g;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const phNoRegex = /^\d{10}$/;
const yearRegex = /^\d{4}$/;

// Validations
// First Name validation

firstName.addEventListener("keyup", (event) => {
  const isValidFirstName = regexCharactersOnly.test(event.currentTarget.value);
  const isNonCharsFirstName = regexNumSym.test(event.currentTarget.value);
  const node = document.createElement("span");

  if (!isValidFirstName || isNonCharsFirstName) {
    node.setAttribute("id", "error");
    const textnode = document.createTextNode("Only Characters are allowed");
    if (!document.getElementById("error")) {
      node.appendChild(textnode);
      firstName.parentElement.appendChild(node);
    }

    if (!event.currentTarget.value && document.getElementById("error")) {
      document.getElementById("error").remove(node);
    }
  } else {
    document.getElementById("error").remove(node);
  }
});

// Last Name validation
lastName.addEventListener("keyup", (event) => {
  const isValidLastName = regexCharactersOnly.test(event.currentTarget.value);
  const isNonCharsLastName = regexNumSym.test(event.currentTarget.value);
  const node = document.createElement("span");

  if (!isValidLastName || isNonCharsLastName) {
    node.setAttribute("id", "error");
    const textnode = document.createTextNode("Only Characters are allowed");
    if (!document.getElementById("error")) {
      node.appendChild(textnode);
      lastName.parentElement.appendChild(node);
    }

    if (!event.currentTarget.value && document.getElementById("error")) {
      document.getElementById("error").remove(node);
    }
  } else {
    document.getElementById("error").remove(node);
  }
});

// E-mail validation
emailEle.addEventListener("keyup", (event) => {
  const isValidEmail = emailRegex.test(event.currentTarget.value);
  node = document.createElement("span");

  if (!isValidEmail) {
    node.setAttribute("id", "error");
    const textnode = document.createTextNode("Enter a valid E-mail ID");

    if (!document.getElementById("error")) {
      node.appendChild(textnode);
      emailEle.parentElement.appendChild(node);
    }
    if (!event.currentTarget.value && document.getElementById("error")) {
      document.getElementById("error").remove(node);
    }
  } else {
    document.getElementById("error").remove(node);
  }
});

// Phone Number Validation

phoneNoEle.addEventListener("keyup", (event) => {
  const isValidNum = phNoRegex.test(event.currentTarget.value);
  node = document.createElement("span");

  if (!isValidNum) {
    node.setAttribute("id", "error");
    const textnode = document.createTextNode("Enter a valid Phone No");

    if (!document.getElementById("error")) {
      node.appendChild(textnode);
      phoneNoEle.parentElement.appendChild(node);
    }
    if (!event.currentTarget.value && document.getElementById("error")) {
      document.getElementById("error").remove(node);
    }
  } else {
    document.getElementById("error").remove(node);
  }
});

// Year validation
yearEle.addEventListener("keyup", (event) => {
  const isValidYear = yearRegex.test(event.currentTarget.value);
  node = document.createElement("span");

  if (!isValidYear) {
    node.setAttribute("id", "error");
    const textnode = document.createTextNode("Enter a valid Year");

    if (!document.getElementById("error")) {
      node.appendChild(textnode);
      yearEle.parentElement.appendChild(node);
    }
    if (!event.currentTarget.value && document.getElementById("error")) {
      document.getElementById("error").remove(node);
    }
  } else {
    document.getElementById("error").remove(node);
  }
});

//collect form data.

const form = document.forms[0];
console.log(form);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const entries = formData.entries();
  const data = Object.fromEntries(entries);
  if (!updateIDVal) {
    // execute a post call
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, action: "btns" }),
    };
    fetch("http://localhost:8080/api/employee", postOptions).then(
      (response) => {
        console.log(response);
        alert("Data Updated Successfully");
        window.location.href = "../table/index.html";
      }
    );
  } else {
    // execute a put call
    const putOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, action: "btns" }),
    };
    fetch(`http://localhost:8080/api/employee/${updateIDVal}`, putOptions).then(
      (response) => {
        console.log(response.json());
        alert("Data Updated Successfully");
        localStorage.clear();
        window.location.href = "../table/index.html";
      }
    );
  }
});

// form.addEventListener("submit", function (event) {
//   event.preventDefault();
//   const formData = new FormData(this);
//   const entries = formData.entries();
//   const data = Object.fromEntries(entries);
//   console.log(data);

//   const postOptions = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ ...data, action: "btns" }),
//   };
//   // postcall.
//   fetch("http://localhost:8080/api/employee", postOptions).then((response) =>
//     console.log(response.json())
//   );
// });

if (updateIDVal) {
  document.getElementById("formButton").value = "UPDATE";
  document.getElementsByClassName("title")[0].innerHTML = "UPDATE";
  fetch(`http://localhost:8080/api/employee/${updateIDVal}`)
    .then((response) => response.json())
    .then((data) => (myData = data))
    .then((myData) => {
      console.log(Object.entries(myData));

      Object.entries(myData).forEach((item) => {
        if (item[0] !== "action") {
          document.getElementsByName(item[0])[0].value = item[1];
        }
      });
    });
}
