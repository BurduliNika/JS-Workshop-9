const API_URL =
  "https://corsproxy.io/?https://f1api.dev/api/current/drivers-championship";

const tableBody = document.querySelector("#drivers-table tbody");
const filterBtn = document.getElementById("filterBtn");
const searchInput = document.getElementById("searchInput");

let driversData = [];

fetch(API_URL)
  .then((res) => res.json())
  .then((data) => {
    driversData = data.drivers_championship;
    renderTable(driversData);
  })
  .catch(() => {
    tableBody.innerHTML = "<tr><td colspan='5'>Failed to load data</td></tr>";
  });

function renderTable(data) {
  tableBody.innerHTML = "";

  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.position}</td>
      <td>${item.driver.name} ${item.driver.surname}</td>
      <td>${item.team.teamName}</td>
      <td>${item.points}</td>
      <td>${item.wins}</td>
    `;
    tableBody.appendChild(row);
  });
}

filterBtn.addEventListener("click", () => {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    renderTable(driversData);
    return;
  }

  const filtered = driversData.filter((item) =>
    `${item.driver.name} ${item.driver.surname}`.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    prompt("Driver not found. Try another name:");
    renderTable(driversData);
  } else {
    renderTable(filtered);
  }
});
