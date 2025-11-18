document.addEventListener("DOMContentLoaded", () => {
  // Data sample
  const donations = [
    { name: "Colour Dish Set", date: "2025-10-05", status: "Approved" },
    { name: "Book Set", date: "2025-09-28", status: "Pending" },
    { name: "Jacket", date: "2025-09-15", status: "Approved" },
  ];

  const receivedItems = [
    { name: "Rice Cooker", date: "2025-10-02", status: "Received" },
    { name: "Winter Coat", date: "2025-09-25", status: "In Transit" },
  ];

  // Render list function
  function renderList(containerId, items) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    items.forEach(({ name, date, status }) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${name} (${date})</span>
        <span class="status-badge">${status}</span>
      `;
      container.appendChild(li);
    });
  }

  renderList("donations-list", donations);
  renderList("received-list", receivedItems);

  // ----- Donate button & Modal logic -----
  const donateBtn = document.getElementById("donate-btn");
  const donateModal = document.getElementById("donate-modal");
  const donateClose = document.getElementById("donate-close");
  const donateForm = document.getElementById("donate-form");

  // Open donate modal
  donateBtn.addEventListener("click", () => {
    donateModal.classList.remove("hidden");
  });

  // Close donate modal
  donateClose.addEventListener("click", () => {
    donateModal.classList.add("hidden");
  });

  // Close modal if click outside content
  donateModal.addEventListener("click", (e) => {
    if (e.target === donateModal) {
      donateModal.classList.add("hidden");
    }
  });

  // Handle donate form submit
  donateForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("donate-name").value.trim();
    const category = document.getElementById("donate-category").value;
    const status = document.getElementById("donate-status").value.trim();
    const pickup = document.getElementById("donate-pickup").value.trim();

    if (!name || !category || !status || !pickup) {
      alert("Please fill all fields.");
      return;
    }

    // Add new donation to donations array (optional, for persistence)
    const today = new Date().toISOString().split("T")[0];
    donations.push({ name, date: today, status });

    // Re-render donation list
    renderList("donations-list", donations);

    // Close modal & reset form
    donateForm.reset();
    donateModal.classList.add("hidden");
  });

  // ----- Leaflet Map Init -----
  const map = L.map("map").setView([24.993628, 121.296967], 11);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const locations = [
    {
      name: "Taoyuan Park - Food Sharing Event",
      coords: [25.0054, 121.3],
      type: "event",
      description: "Community Food Sharing on Oct 5",
    },
    {
      name: "Zhongli Library - Book Donation",
      coords: [24.9671, 121.2168],
      type: "event",
      description: "Book Donation Drive on Oct 12",
    },
    {
      name: "Pingzhen Center - Clothes Swap",
      coords: [24.9034, 121.2561],
      type: "event",
      description: "Clothes Swap Event on Oct 19",
    },
    {
      name: "Bade Hall - Toy Donation",
      coords: [24.9602, 121.2917],
      type: "event",
      description: "Toy Donation Drive on Oct 26",
    },
    {
      name: "Mr. Lin Pickup Location",
      coords: [24.99, 121.3],
      type: "pickup",
      description: "Pickup Location: 123 Taoyuan St.",
    },
    {
      name: "Ms. Chen Pickup Location",
      coords: [24.965, 121.22],
      type: "pickup",
      description: "Pickup Location: 456 Pingzhen Rd.",
    },
  ];

  const iconColors = {
    event: "#ef9d38",
    pickup: "#4caf50",
  };

  function createCustomIcon(color) {
    return L.divIcon({
      html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="36" viewBox="0 0 24 36"><path fill="${color}" d="M12 0C7 0 3 4 3 9c0 7.5 9 27 9 27s9-19.5 9-27c0-5-4-9-9-9z"/></svg>`,
      className: "",
      iconSize: [24, 36],
      iconAnchor: [12, 36],
    });
  }

  locations.forEach(({ coords, type, name, description }) => {
    const marker = L.marker(coords, {
      icon: createCustomIcon(iconColors[type] || "#555"),
    }).addTo(map);

    marker.bindPopup(`<b>${name}</b><br>${description}`);
  });
});
