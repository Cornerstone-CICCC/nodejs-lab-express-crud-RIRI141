const API_URL = "http://localhost:4000/employees";
const list = document.querySelector("ul.list");

const getEmployees = async () => {
  const res = await fetch(API_URL, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Failed to add employee: ${response.statusText}`);
  }

  const data = await res.json();
  return data;
};

const getEmployeeByID = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error(`Failed to add employee: ${response.statusText}`);
  }

  const data = await res.json(); // Returned employee data
  return data;
};

// const addSection = document
//   .querySelector("#info_of_emp")
//   .addEventListener("submit", (e) => {
//     e.preventDefault();
//     const fname = document.querySelector("#fname").value;
//     const lname = document.querySelector("#lname").value;
//     const age = document.querySelector("#age").value;
//     const isMarried = document.querySelector("#isMarried").checked;
//     addEmployee(fname, lname, age, isMarried);
//     document.querySelector("#info_of_emp").reset();
//   });

const addEmployee = async (firstname, lastname, age, isMarried) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // When doing POST/PUT/PATCH, you need to set the Content-Type
    },
    body: JSON.stringify({ firstname, lastname, age, isMarried }),
  });

  if (!res.ok) {
    throw new Error(`Failed to get employees: ${response.statusText}`);
  }

  const data = await res.json(); // Returned employee data
  return data;
};

const updateEmployee = async (id, firstname, lastname, age, isMarried) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", // When doing POST/PUT/PATCH, you need to set the Content-Type
    },
    body: JSON.stringify({ firstname, lastname, age, isMarried }),
  });

  if (!res.ok) {
    throw new Error(`Failed to get employees: ${response.statusText}`);
  }

  const data = await res.json(); // Returned employee data
  return data;
};

const deleteEmployee = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Failed to get employees: ${response.statusText}`);
  }

  const data = await res.json(); // Returned employee data
  return data;
};
const searchEmployee = async (fn) => {
  const res = await fetch(`${API_URL}/search?firstname=${fn}`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Failed to get employees: ${response.statusText}`);
  }

  const data = await res.json(); // Returned employee data
  return data;
};

const viewEmployee = (emp) => {
  const viewSection = document.querySelector("#info_of_emp");
  const employees = Array.isArray(emp) ? emp : [emp];

  employees.forEach((emp) => {
    const empInfo = document.createElement("div");
    empInfo.innerHTML = `
      <p>First Name: ${emp.firstname}</p>
      <p>Last Name: ${emp.lastname}</p>
      <p>Age: ${emp.age}</p>
      <p>Married: ${emp.isMarried ? "Yes" : "No"}</p>
      <hr>
    `;
    viewSection.appendChild(empInfo);
  });
};
const renderEmployees = (employees) => {
  // const employees =  getEmployees();
  const list = document.querySelector("#employee-list");
  list.innerHTML = "";

  employees.forEach((emp) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <span>${emp.firstname} ${emp.lastname}</span>
    <button onclick="handleView('${emp.id}')">VIEW</button>
    <button onclick="handleEdit('${emp.id}')">EDIT</button>
    <button onclick="handleDelete('${emp.id}')">DELETE</button>

    <input placeholder="Enter First Name...">
    <button onclick="handleSearch('${emp.firstname}')">Search and View Employees</button>
    `;
    list.appendChild(li);
  });
};
const handleView = async (id) => {
  const employee = await getEmployeeByID(id);
  viewEmployee(employee);
};
const handleEdit = async (id) => {
  const employee = await getEmployeeByID(id);

  document.querySelector("#edit-first-name").value = employee.firstname;
  document.querySelector("#edit-last-name").value = employee.lastname;
  document.querySelector("#edit-age").value = employee.age;
  document.querySelector("#edit-married").checked = employee.isMarried;

  document
    .querySelector("#edit-employee form")
    .setAttribute("data-employee-id", employee.id);

  document
    .querySelector("#edit-employee")
    .scrollIntoView({ behavior: "smooth" });
};
const handleDelete = async (id) => {
  if (confirm("Are you sure you want to delete this employee?")) {
    await deleteEmployee(id);
    const employees = await getEmployees();
    renderEmployees(employees);
  }
};
const handleSearch = async (fn) => {
  const results = await searchEmployee(fn);
  viewEmployee(results);
};

document.addEventListener("DOMContentLoaded", async () => {
  const employees = await getEmployees();
  renderEmployees(employees);

  document.querySelector("#add-employee form").onsubmit = async (event) => {
    event.preventDefault();
    const firstname = document.querySelector("#first-name").value;
    const lastname = document.querySelector("#last-name").value;
    const age = parseInt(document.querySelector("#age").value, 10);
    const isMarried = document.querySelector("#married").checked;

    await addEmployee(firstname, lastname, age, isMarried);
    event.target.reset();

    const employees = await getEmployees();
    renderEmployees(employees);
  };

  document.querySelector("#edit-employee form").onsubmit = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute("data-employee-id");
    const firstname = document.querySelector("#edit-first-name").value;
    const lastname = document.querySelector("#edit-last-name").value;
    const age = parseInt(document.querySelector("#edit-age").value, 10);
    const isMarried = document.querySelector("#edit-married").checked;

    await updateEmployee(id, firstname, lastname, age, isMarried);
    const employees = await getEmployees();
    renderEmployees(employees);
  };

  document.querySelector("#search button").onclick = async () => {
    const query = document.querySelector("#search input").value.trim();
    if (query) {
      const results = await searchEmployee(query);
      viewEmployee(results);
    }
  };

  getEmployees().then((employees) => {
    renderEmployees(employees);
  });
});
