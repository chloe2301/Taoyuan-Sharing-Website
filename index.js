document.addEventListener("DOMContentLoaded", () => {
  // ===== Language Switcher =====
  const langButtons = document.querySelectorAll("#language-switcher button");
  const texts = {
    en: {
      title: "Welcome to Taoyuan Sharing Community",
      mission:
        "Share, Save, Smile — Free Food, Clothes, Books & Useful Items Around You!",
    },

    zh: {
      title: "欢迎来到桃园共享社区",
      mission:
        "分享、节省、微笑——在您周围找到免费的食物、衣物、书籍和实用物品！",
    },
  };

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      document.getElementById("main-title").textContent = texts[lang].title;
      document.getElementById("main-mission").textContent = texts[lang].mission;
    });
  });

  // ===== Upcoming Events Slider =====
  const eventsSlider = document.getElementById("events-slider");
  document.getElementById("upcomingBar").addEventListener("click", function () {
    window.location.href = "https://example.com/upcoming-events";
  });
  const events = [
    {
      title: "Community Food Sharing",
      date: "Oct 5",
      location: "Taoyuan Park",
      img: "https://plus.unsplash.com/premium_photo-1754341357839-a11120163778?",
    },
    {
      title: "Book Donation Drive",
      date: "Oct 12",
      location: "Zhongli Library",
      img: "https://images.unsplash.com/photo-1591171550305-7faf12e39a27?",
    },
    {
      title: "Clothes Swap Event",
      date: "Oct 19",
      location: "Pingzhen Center",
      img: "https://plus.unsplash.com/premium_photo-1676587710768-3c36f6aa9fdd?",
    },
    {
      title: "Toy Donation Drive",
      date: "Oct 26",
      location: "Bade Hall",
      img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?",
    },
  ];

  function createEventItem(e) {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
    <img src="${e.img}" alt="${e.title}">
    <span class="badge">Near You</span>
    <div class="text-below">
      <h3>${e.title}</h3>
      <p>${e.date} - ${e.location}</p>
    </div>
  `;
    return div;
  }

  // Clear slider
  eventsSlider.innerHTML = "";

  // Append events 2 lần để scroll infinite
  [...events, ...events].forEach((e) =>
    eventsSlider.appendChild(createEventItem(e))
  );

  // Auto scroll
  let scrollPos = 0;
  const scrollSpeed = 1;

  function scrollEvents() {
    scrollPos += scrollSpeed;
    if (scrollPos >= eventsSlider.scrollWidth / 2) scrollPos = 0; // reset
    eventsSlider.scrollLeft = scrollPos;
    requestAnimationFrame(scrollEvents);
  }
  scrollEvents();

  // Thêm nút trái/phải
  const btnLeft = document.createElement("button");
  btnLeft.innerText = "◀";
  btnLeft.style.position = "absolute";
  btnLeft.style.left = "10px";
  btnLeft.style.top = "50%";
  btnLeft.style.transform = "translateY(-50%)";
  btnLeft.style.zIndex = "10";
  btnLeft.style.fontSize = "2rem";
  btnLeft.style.background = "rgba(255,255,255,0.7)";
  btnLeft.style.border = "none";
  btnLeft.style.cursor = "pointer";
  eventsSlider.parentElement.style.position = "relative";
  eventsSlider.parentElement.appendChild(btnLeft);

  const btnRight = document.createElement("button");
  btnRight.innerText = "▶";
  btnRight.style.position = "absolute";
  btnRight.style.right = "10px";
  btnRight.style.top = "50%";
  btnRight.style.transform = "translateY(-50%)";
  btnRight.style.zIndex = "10";
  btnRight.style.fontSize = "2rem";
  btnRight.style.background = "rgba(255,255,255,0.7)";
  btnRight.style.border = "none";
  btnRight.style.cursor = "pointer";
  eventsSlider.parentElement.appendChild(btnRight);

  // Scroll khi nhấn nút
  btnLeft.addEventListener("click", () => {
    scrollPos -= 150; // scroll trái
  });

  btnRight.addEventListener("click", () => {
    scrollPos += 150; // scroll phải
  });

  // ===== New Items List =====
  document.getElementById("hotItemsBar").addEventListener("click", function () {
    window.location.href = "https://example.com/hot-items-list";
  });
  const newItems = [
    {
      name: "Colour Dish Set",
      area: "Taoyuan Center",
      img: "https://images.unsplash.com/photo-1677591276151-e11ed2e307c6?",
      description: "Like new, Japanese brand, perfect for everyday use.",
      donor: "Mr. Lin",
      pickup: "123 Taoyuan St.",
    },
    {
      name: "Book Set",
      area: "Pingzhen",
      img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?",
      description: "A set of self help novels.",
      donor: "Ms. Chen",
      pickup: "456 Pingzhen Rd.",
    },
    {
      name: "Jacket",
      area: "Zhongli",
      img: "https://images.unsplash.com/photo-1711527124424-463764d8d8e5?",
      description: "Warm jacket for winter.",
      donor: "Mr. Wang",
      pickup: "789 Zhongli Ave.",
    },
    {
      name: "Box of apple",
      area: "Bade",
      img: "https://images.unsplash.com/photo-1719274868535-9f4af7296306?",
      description: "Almost new rice cooker, great condition.",
      donor: "Ms. Lee",
      pickup: "101 Bade Rd.",
    },
  ];

  const newList = document.getElementById("new-items-list");
  const modal = document.getElementById("item-modal");
  const modalImg = document.getElementById("modal-img");
  const modalName = document.getElementById("modal-name");
  const modalArea = document.getElementById("modal-area");
  const modalDescription = document.getElementById("modal-description");
  const modalDonor = document.getElementById("modal-donor");
  const modalPickup = document.getElementById("modal-pickup");
  const modalClose = document.getElementById("modal-close");

  // Tạo danh sách items
  newItems.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${item.img}" alt="${item.name}" />
      <strong>${item.name}</strong>
      <span>${item.area}</span>
    `;

    li.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = item.img;
      modalName.textContent = item.name;
      modalArea.textContent = "Area: " + item.area;
      modalDescription.textContent =
        "Description: " + (item.description || "No description.");
      modalDonor.textContent = "Donor: " + (item.donor || "Unknown");
      modalPickup.textContent =
        "Pickup Location: " + (item.pickup || "To be arranged");
    });

    newList.appendChild(li);
  });

  // Đóng modal
  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Click ngoài modal-content để đóng
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // ===== Weekly Donor Leaderboard =====
  const leaders = ["Alice - 12 items", "Bob - 9 items", "Charlie - 7 items"];
  const leaderboard = document.getElementById("leaderboard-list");
  leaders.forEach((l) => {
    const li = document.createElement("li");
    li.textContent = l;
    leaderboard.appendChild(li);
  });

  // ===== Auth Tabs =====
  const tabR = document.getElementById("tab-register");
  const tabL = document.getElementById("tab-login");
  const formR = document.getElementById("register-form");
  const formL = document.getElementById("login-form");

  tabR.addEventListener("click", () => {
    tabR.classList.add("active");
    tabL.classList.remove("active");
    formR.style.display = "flex";
    formL.style.display = "none";
  });
  tabL.addEventListener("click", () => {
    tabL.classList.add("active");
    tabR.classList.remove("active");
    formL.style.display = "flex";
    formR.style.display = "none";
  });

  // ===== Register/Login =====
  const btnRegister = document.getElementById("btn-register");
  const btnLogin = document.getElementById("btn-login");
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");
  const welcomeBox = document.getElementById("welcome-box");
  const welcomeText = document.getElementById("welcome-text");

  // Switch between Register and Login
  btnRegister.addEventListener("click", () => {
    btnRegister.classList.add("active");
    btnLogin.classList.remove("active");
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
    welcomeBox.classList.add("hidden");
  });

  btnLogin.addEventListener("click", () => {
    btnLogin.classList.add("active");
    btnRegister.classList.remove("active");
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
    welcomeBox.classList.add("hidden");
  });

  // Handle Register Form
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("reg-name").value;
    welcomeText.textContent = `🩵 Welcome you to Taoyuan Sharing Community, ${name}!`;
    welcomeBox.classList.remove("hidden");
    registerForm.reset();
    registerForm.classList.remove("active");
  });

  // Handle Login Form
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    welcomeText.textContent = `💚 Welcome back to Sharing Account (${email})!`;
    welcomeBox.classList.remove("hidden");
    loginForm.reset();
    loginForm.classList.remove("active");
  });
});
