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

document.getElementById("schedule_opt").addEventListener("click", () => {
  get_data("get_schedule").then((data) => render_schedule(data));
});
