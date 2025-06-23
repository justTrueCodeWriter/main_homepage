async function get_data(endpoint) {
  const response = await fetch(`http://127.0.0.1:5000/${endpoint}`);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const data = await response.json();
  return data;
}

async function complete_task() {}

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

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = item["line_number"];
    checkbox.id = `checkbox-${item["line_number"]}`;

    const label = document.createElement("label");
    label.for = checkbox.id;
    label.innerHTML = item["note"];

    task.appendChild(checkbox);
    task.appendChild(label);

    tasks_container.appendChild(task);
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

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = item["line_number"];
    checkbox.id = `checkbox-${item["line_number"]}`;

    const label = document.createElement("label");
    label.for = checkbox.id;
    label.innerHTML = item["note"];

    task.appendChild(checkbox);
    task.appendChild(label);

    tasks_container.appendChild(task);
  }
  org_container.appendChild(tasks_container);
}

function render_agenda(data) {
  const org_container = document.getElementById("org_container");
  org_container.innerHTML = "";

  console.log(data["title"].length)
  
  for (let i = 0; i < data["title"].length; i++) {
    const title = document.createElement("h3");
    title.innerHTML = data["title"][i];
    title.className = "date-title";

    const tasks_container = document.createElement("div");
    tasks_container.className = "tasks-container";

    for (item of data["content"][i]) {
      const task = document.createElement("div");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = item["line_number"];
      checkbox.id = `checkbox-${item["line_number"]}`;

      const label = document.createElement("label");
      label.for = checkbox.id;
      label.innerHTML = item["note"];

      task.appendChild(checkbox);
      task.appendChild(label);

      tasks_container.appendChild(task);
    }
    org_container.appendChild(title);
    org_container.appendChild(tasks_container);
  }
}

document.getElementById("schedule_opt").addEventListener("click", () => {
  get_data("get_schedule").then((data) => render_schedule(data));
});

document.getElementById("todo_opt").addEventListener("click", () => {
  get_data("get_todo").then((data) => render_todo(data));
});

document.getElementById("agenda_opt").addEventListener("click", () => {
  get_data("get_agenda").then((data) => render_agenda(data));
});
