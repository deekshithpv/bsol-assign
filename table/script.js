const dataKeys = [
  "First Name",
  "Last Name",
  "Date of join",
  "Department",
  "Contact No",
  "E-mail ID",
  "Highest Qualification",
  "Action",
  "ID",
];

const setHeader = (arr) => {
  const row = document.createElement("tr");
  dataKeys.forEach((x) => {
    const hEle = document.createElement("th");
    const textNode = document.createTextNode(x);
    hEle.appendChild(textNode);
    row.appendChild(hEle);
  });

  document.getElementById("table-header").appendChild(row);
};
//
const setRows = (tableData) => {
  const ignoreKeys = [
    "updatedAt",
    "createdAt",
    "address",
    "completionYear",
    "experience",
    "gpa",
    "salary",
    "university",
    "isActive",
  ];
  const buttons = ["UPDATE", "DELETE"];
  tableData
    .filter((rowItem) => rowItem.isActive == "true")
    .forEach((record) => {
      const filteredTdvalues = Object.entries(record)
        .filter((item) => !ignoreKeys.includes(item[0]))
        .map((filteredItem) => filteredItem[1]);

      const tdValues = filteredTdvalues;
      const row = document.createElement("tr");
      tdValues.forEach((x) => {
        const dataEl = document.createElement("td");
        if (x !== "btns") {
          const textNode = document.createTextNode(x);
          dataEl.appendChild(textNode);
          row.appendChild(dataEl);
        } else {
          buttons.forEach((itemVal) => {
            const btnEl = document.createElement("button");
            btnEl.setAttribute("class", `${itemVal}-btn`);
            btnEl.setAttribute("data-record", `${JSON.stringify(record)}`);
            btnEl.innerHTML = itemVal;
            dataEl.appendChild(btnEl);
            row.appendChild(dataEl);
          });
        }
      });
      document.getElementById("table-body").appendChild(row);
    });
};

let myData = null;
fetch("http://localhost:8080/api/employee")
  .then((response) => response.json())
  .then((data) => (myData = data))
  .then((myData) => {
    console.log(myData);
    setHeader(myData);
    setRows(myData);
  });

// Update and delete Functionalities
//Delete functionalities.
setTimeout(() => {
  delBtns = document.querySelectorAll(".DELETE-btn");
  delBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      console.log("hello");
      const record = JSON.parse(event.target.dataset.record);
      const id = record.id;
      delete record.id;
      const putOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...record, isActive: "false", action: "btns" }),
      };
      fetch(`http://localhost:8080/api/employee/${id}`, putOptions).then(
        (response) => {
          console.log(response.json());
          window.location.reload();
        }
      );
    });
  });
}, 1000);

// Update functionalities

setTimeout(() => {
  updateBtns = document.querySelectorAll(".UPDATE-btn");
  updateBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      updateRecord = JSON.parse(event.currentTarget.dataset.record);
      localStorage.setItem("updateID", updateRecord.id);

      window.location.href = "../form/index.html";
    });
  });
}, 1000);
