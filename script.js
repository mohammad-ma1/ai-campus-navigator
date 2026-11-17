// AI Campus Navigator — shared JavaScript

// Mobile menu toggle
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
if (menuBtn) {
  menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
}

// Highlight the current page in the menu
const currentPage = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach((link) => {
  if (link.getAttribute("href") === currentPage) link.classList.add("active");
});

// Add a "Copy" button to every prompt box
function addCopyButtons(root = document) {
  root.querySelectorAll(".prompt").forEach((box) => {
    if (box.querySelector(".copy-btn")) return;
    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.textContent = "Copy";
    btn.addEventListener("click", () => {
      const text = box.textContent.replace(/^Copy|Copied!/, "").trim();
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = "Copied!";
        setTimeout(() => (btn.textContent = "Copy"), 1500);
      });
    });
    box.prepend(btn);
  });
}
addCopyButtons();

// Generic filter tabs: buttons with data-filter show elements with matching data-group
document.querySelectorAll(".tabs[data-target]").forEach((tabs) => {
  const items = document.querySelectorAll(tabs.dataset.target);
  tabs.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const filter = tab.dataset.filter;
      items.forEach((item) => {
        item.style.display = filter === "all" || item.dataset.group === filter ? "" : "none";
      });
    });
  });
});
