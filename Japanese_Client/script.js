function includeHTML() {
  const includes = document.querySelectorAll("[data-include]");
  return Promise.all(
    Array.from(includes).map(async (el) => {
      const file = el.getAttribute("data-include");
      try {
        const res = await fetch(file);
        if (!res.ok) throw new Error("Failed to load " + file);
        el.innerHTML = await res.text();
      } catch (e) {
        el.innerHTML = `<p style="color: red;">${e.message}</p>`;
      }
    })
  );
}

function toggleDropdown() {
  const menu = document.getElementById("dropdownMenu");
  if (!menu) return;
  let overlay = document.getElementById("dropdownOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "dropdown-overlay";
    overlay.id = "dropdownOverlay";
    document.body.appendChild(overlay);
  }
  if (menu.classList.contains("open")) {
    menu.classList.remove("open");
    overlay.classList.remove("open");
    setTimeout(() => {
      menu.style.display = "none";
      overlay.style.display = "none";
    }, 550);
  } else {
    menu.style.display = "flex";
    overlay.style.display = "block";
    // force reflow for transition
    void menu.offsetWidth;
    void overlay.offsetWidth;
    menu.classList.add("open");
    overlay.classList.add("open");
    overlay.onclick = function (e) {
      if (e.target === overlay) toggleDropdown();
    };
  }
}

document.addEventListener("DOMContentLoaded", () => {
  includeHTML().then(() => {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    reveals.forEach((el) => observer.observe(el));
  });
});

document.addEventListener("DOMContentLoaded", () => {
  includeHTML().then(() => {
 
    // Do NOT call toggleDropdown() on load
    // Dropdown will only show on click
    // Ensure dropdown is hidden on load
    const menu = document.getElementById("dropdownMenu");
    if (menu) {
      menu.classList.remove("open");
      menu.style.display = "none";
    }
    const overlay = document.getElementById("dropdownOverlay");
    if (overlay) {
      overlay.classList.remove("open");
      overlay.style.display = "none";
    }
  });
});

document.getElementById("getDirection").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // Destination coordinates (InterContinental Dhaka)
        const destination = "23.7623,90.4068"; // replace with exact lat,lng

        // Open Google Maps with directions from current location
        const url = `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${destination}`;
        window.open(url, "_blank");
      },
      (error) => {
        alert("Unable to access your location. Please allow location access.");
        console.error(error);
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
});

