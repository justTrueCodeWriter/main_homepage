async function get_data(endpoint) {
  const response = await fetch(`http://127.0.0.1:5000/${endpoint}`);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const data = await response.json();
  return data;
}

async function complete_task(line_number) {
  console.log(line_number);
  const response = await fetch(
    `http://127.0.0.1:5000/set_task_done?line_number=${line_number}`,
  );
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
}

async function render_schedule(data) {
  const org_container = document.getElementById("org_container");
  org_container.innerHTML = "";

  const title = document.createElement("h3");
  title.innerHTML = data["title"];
  title.className = "date-title";

  const tasks_container = document.createElement("div");
  tasks_container.className = "tasks-container";

  for (item of data["content"]) {
    const task = document.createElement("div");

    if (item["status"] != "non") {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "org-schedule-checkbox";
      checkbox.value = item["line_number"];
      checkbox.id = `checkbox-${item["line_number"]}`;
      checkbox.addEventListener("change", (event) => {
        complete_task(event.target.value).then(() =>
          get_data("get_schedule").then((data) => render_schedule(data)),
        );
      });

      if (item["status"] === "DONE") checkbox.checked = true;

      const label = document.createElement("label");
      label.htmlFor = checkbox.id;
      label.innerHTML = item["note"];

      task.appendChild(checkbox);
      task.appendChild(label);

      tasks_container.appendChild(task);
    } else {
      label = document.createElement("label");
      label.innerHTML = item["note"];

      tasks_container.appendChild(label);
    }
  }
  org_container.appendChild(title);
  org_container.appendChild(tasks_container);
}

function render_todo(data) {
  const org_container = document.getElementById("org_container");
  org_container.innerHTML = "";

  const tasks_container = document.createElement("div");
  tasks_container.className = "tasks-container";

  for (item of data["content"]) {
    const task = document.createElement("div");

    if (item["status"] != "non") {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "org-todo-checkbox";
      checkbox.value = item["line_number"];
      checkbox.id = `checkbox-${item["line_number"]}`;
      checkbox.addEventListener("change", (event) => {
        complete_task(event.target.value).then(() =>
          get_data("get_todo").then((data) => render_todo(data)),
        );
      });

      const label = document.createElement("label");
      label.htmlFor = checkbox.id;
      label.innerHTML = item["note"];

      task.appendChild(checkbox);
      task.appendChild(label);

      tasks_container.appendChild(task);
    } else {
      label = document.createElement("label");
      label.innerHTML = item["note"];

      tasks_container.appendChild(label);
    }
  }
  org_container.appendChild(tasks_container);
}

function render_agenda(data) {
  const org_container = document.getElementById("org_container");
  org_container.innerHTML = "";

  console.log(data["title"].length);

  for (let i = 0; i < data["title"].length; i++) {
    const title = document.createElement("h3");
    title.innerHTML = data["title"][i];
    title.className = "date-title";

    const tasks_container = document.createElement("div");
    tasks_container.className = "tasks-container";

    for (item of data["content"][i]) {
      const task = document.createElement("div");

      if (item["status"] != "non") {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "org-agenda-checkbox";
        checkbox.value = item["line_number"];
        checkbox.id = `checkbox-${item["line_number"]}`;
        checkbox.addEventListener("change", (event) => {
          complete_task(event.target.value).then(() =>
            get_data("get_agenda").then((data) => render_agenda(data)),
          );
        });

        if (item["status"] === "DONE") checkbox.checked = true;

        const label = document.createElement("label");
        label.htmlFor = checkbox.id;
        label.innerHTML = item["note"];

        task.appendChild(checkbox);
        task.appendChild(label);

        tasks_container.appendChild(task);
      } else {
        label = document.createElement("label");
        label.innerHTML = item["note"];

        tasks_container.appendChild(label);
      }
    }
    org_container.appendChild(title);
    org_container.appendChild(tasks_container);
  }
}

document.getElementById("schedule_opt").addEventListener("change", () => {
  get_data("get_schedule").then((data) => render_schedule(data));
});

document.getElementById("todo_opt").addEventListener("change", () => {
  get_data("get_todo").then((data) => render_todo(data));
});

document.getElementById("agenda_opt").addEventListener("change", () => {
  get_data("get_agenda").then((data) => render_agenda(data));
});

document.addEventListener("DOMContentLoaded", function () {
  var checkedRadio = document.querySelector(
    'input[type="radio"][name="org_opt"]:checked',
  );
  if (checkedRadio) {
    switch (checkedRadio.id) {
      case "schedule_opt":
        get_data("get_schedule").then((data) => render_schedule(data));
        break;
      case "todo_opt":
        get_data("get_todo").then((data) => render_todo(data));
        break;
      case "agenda_opt":
        get_data("get_agenda").then((data) => render_agenda(data));
        break;
    }
  }
});
