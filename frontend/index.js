function read() {
  fetch("http://localhost:8000/read").then((response) =>
    response.json().then((data) => {
      data.forEach((row) => {
        const tableBody = document.querySelector("tbody");
        //console.log(tableBody);
        const rowHTML = document.createElement("tr");
        tableBody.appendChild(rowHTML);

        const name = document.createElement("td");
        name.innerHTML = row.passenger_name;
        rowHTML.appendChild(name);

        const dept_loc = document.createElement("td");
        dept_loc.innerHTML = row.dept_loc;
        rowHTML.appendChild(dept_loc);

        const arr_loc = document.createElement("td");
        arr_loc.innerHTML = row.arr_loc;
        rowHTML.appendChild(arr_loc);

        const dept_date = document.createElement("td");
        dept_date.innerHTML = row.dept_date.substring(0, 10);
        rowHTML.appendChild(dept_date);

        const arr_date = document.createElement("td");
        arr_date.innerHTML = row.arr_date.substring(0, 10);
        rowHTML.appendChild(arr_date);

        const ph_no = document.createElement("td");
        ph_no.innerHTML = row.ph_no;
        rowHTML.appendChild(ph_no);

        const email = document.createElement("td");
        email.innerHTML = row.email;
        rowHTML.appendChild(email);

        const updateButton = document.createElement("button");
        updateButton.innerHTML = "Update";
        updateButton.setAttribute("type", "button");
        updateButton.setAttribute("class", "btn btn-warning btn-sm ms-1 me-1 mt-1 mb-1");
        updateButton.onclick = function () {
          const form = document.getElementById("add-update-form");
          form.style.display = "";

          const nameField = form.querySelector("#passenger_name");
          nameField.value = row.passenger_name;

          const dept_locField = form.querySelector("#dept_loc");
          dept_locField.value = row.dept_loc;

          const arr_locField = form.querySelector("#arr_loc");
          arr_locField.value = row.arr_loc;

          const dept_dateField = form.querySelector("#dept_date");
          dept_dateField.value = row.dept_date.substring(0, 10);

          const arr_dateField = form.querySelector("#arr_date");
          arr_dateField.value = row.arr_date.substring(0, 10);

          const phoneField = form.querySelector("#ph_no");
          phoneField.value = row.ph_no;
          phoneField.setAttribute("readonly", "");

          const emailField = form.querySelector("#email");
          emailField.value = row.email;

          const submitButton = form.querySelector("#createData");
          submitButton.id = "updateData";
          submitButton.addEventListener("click", async (event) => {
            event.preventDefault();

            let url = "http://localhost:8000/update";

            try {
              const formData = new FormData(form);
              console.log("Form Data", formData);
              const responseData = await postFormDataAsJson({ url, formData });

              console.log({ responseData });
              location.href = "index.html";
            } catch (error) {
              console.error(error);
            }
          });

          async function postFormDataAsJson({ url, formData }) {
            const plainFormData = Object.fromEntries(formData.entries());
            const formDataJsonString = JSON.stringify(plainFormData);
            console.log(formDataJsonString);

            const fetchOptions = {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: formDataJsonString,
            };

            const response = await fetch(url, fetchOptions);

            if (!response.ok) {
              const errorMessage = await response.text();
              throw new Error(errorMessage);
            }

            return response.json();
          }
        };

        rowHTML.appendChild(updateButton);

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.setAttribute("type", "button");
        deleteButton.setAttribute("class", "btn btn-outline-danger btn-sm ms-1 me-1 mt-1 mb-1");
        deleteButton.onclick = async function () {
          let url = "http://localhost:8000/delete";

          const response = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(row),
          });

          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
          }

          console.log(response);

          location.href = "index.html"
        };
        rowHTML.appendChild(deleteButton);

        //console.log(rowHTML);
      });
    })
  );
}
read();

const addData = document.getElementById("addData");
addData.addEventListener("click", () => {
  const form = document.getElementById("add-update-form");
  form.style.display = "";

  form.addEventListener("submit", handleFormSubmit);

  async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;

    let url = "http://localhost:8000/create";

    try {
      const formData = new FormData(form);
      console.log("Form Data", formData);
      const responseData = await postFormDataAsJson({ url, formData });

      console.log({ responseData });
      //location.href = "index.html"
    } catch (error) {
      console.error(error);
    }
  }

  async function postFormDataAsJson({ url, formData }) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);
    console.log(formDataJsonString);

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: formDataJsonString,
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    return response.json();
  }
});
