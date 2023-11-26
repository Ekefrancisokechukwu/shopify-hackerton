const popupButton = document.querySelector(".user-box");
const initial = document.querySelector(".initial-mobile");
const dropDown = document.querySelector(".drop-down");
const mainBox = document.getElementById("dropdown-menu");

const alertBox = document.querySelector(".alert-box");
const alertTriggerBtn = document.getElementById("notification-trigger");
const alertDropDown = document.querySelector(".notification-drop-down");
const menuItems = dropDown.querySelectorAll(".drop-down-label");
const accordionItems = document.querySelectorAll(".accordion-box");
const collapesBtn = document.querySelector(".collapes-btn");
const checkboxes = document.querySelectorAll(".accordion-checkbox");
const statusText = document.querySelector(".status-text");
const progressfill = document.getElementById("progress-fill");
const removeBtn = document.querySelector(".plan-close");
const checkboxState = document.getElementById("checkbox-state");

const removeMessage = () => {
  const message = document.querySelector(".plan-article");
  message.style.display = "none";

  removeBtn.setAttribute("aria-live", "polite");
  removeBtn.setAttribute("aria-atomic", "true");
};

const toggleMenu = () => {
  let expanded = popupButton.getAttribute("aria-expanded") === "true";
  popupButton.setAttribute("aria-expanded", !expanded);
  dropDown.classList.toggle("open-drop-down");
  const first = document.getElementById("button1");

  if (!expanded) {
    dropDown.focus();
    first.focus();
  } else {
    popupButton.focus();
  }
};

const closeMenu = () => {
  popupButton.setAttribute("aria-expanded", "false");
  dropDown.classList.remove("open-drop-down");
};

const toggleAlert = () => {
  alertDropDown.classList.toggle("open-alert");
  let expanded = alertTriggerBtn.getAttribute("aria-expanded") === "true";
  alertTriggerBtn.setAttribute("aria-expanded", !expanded);
  if (!expanded) {
    alertDropDown.focus();
  }
};

const closeAlert = () => {
  alertTriggerBtn.setAttribute("aria-expanded", "false");
  alertDropDown.classList.remove("open-alert");
};

initial.addEventListener("click", toggleMenu);

menuItems.forEach((item, index) => {
  const menuListItem = item.querySelector("[role='menuItemBtn']");

  menuListItem.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
      const prevIndex = (index - 1 + menuItems.length) % menuItems.length;
      menuItems[prevIndex].querySelector("[role='menuItemBtn']").focus();
    }
    if (event.key === "ArrowDown") {
      const nextIndex = (index + 1) % menuItems.length;
      menuItems[nextIndex].querySelector("[role='menuItemBtn']").focus();
    }
  });
});

accordionItems.forEach((item, index) => {
  const triggerBtn = item.querySelector(".accordion-trigger");
  const checkbox = item.querySelector(".accordion-checkbox");
  const content = item.nextElementSibling;

  let nextCheckbox = content?.querySelector(".accordion-checkbox");

  triggerBtn.addEventListener("click", (event) => {
    if (event.target === triggerBtn) {
      closeAllAccordions();
      item.classList.add("isActive");
      triggerBtn.setAttribute("aria-expanded", "true");
    }
  });

  checkbox.addEventListener("change", () => {
    updateCheckbox(index);

    if (checkbox.checked && nextCheckbox && !nextCheckbox.checked) {
      closeAllAccordions();
      openNextAccordion(index + 1);
    }
  });

  checkbox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      updateCheckbox(index);
      this.checked = !this.checked;
    }
  });

  triggerBtn.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
      const prevIndex =
        (index - 1 + accordionItems.length) % accordionItems.length;
      accordionItems[prevIndex].querySelector(".accordion-trigger").focus();
    }

    if (event.key === "ArrowDown") {
      const nextIndex = (index + 1) % accordionItems.length;
      accordionItems[nextIndex].querySelector(".accordion-trigger").focus();
    }
  });
});

function closeAllAccordions() {
  accordionItems.forEach((item) => {
    const triggerBtn = item.querySelector(".accordion-trigger");
    item.classList.remove("isActive");
    triggerBtn.setAttribute("aria-expanded", "false");
  });
}

function openNextAccordion(index) {
  let nextAccordion = accordionItems[index];
  let nextTriggerBtn =
    accordionItems[index].querySelector(".accordion-trigger");

  setTimeout(() => {
    if (nextAccordion) {
      nextTriggerBtn.setAttribute("aria-expanded", "true");
      nextAccordion.classList.add("isActive");
    }
  }, [1000]);
}

const updateCheckbox = (index) => {
  const loadingSpinners = document.querySelectorAll(".spinner");

  setTimeout(() => {
    let checkedCount = 0;
    checkboxes.forEach((checkbox) => {
      const spinner = loadingSpinners[index];
      spinner.style.display = "block";
      checkboxState.ariaLabel = "loading please wait";

      const ariatext =
        checkbox.parentElement.parentElement.querySelector(
          "button"
        )?.textContent;

      setTimeout(() => {
        if (checkbox && checkbox.checked) {
          checkedCount++;
          updateCheckboxIcon(checkbox, true);
          checkboxState.ariaLabel = ` ${ariatext} succefuly done`;
        } else {
          updateCheckboxIcon(checkbox, false);
          checkboxState.ariaLabel = ` ${ariatext} succefuly undone`;
        }

        spinner.style.display = "none";
        let progressFill = (checkedCount / checkboxes.length) * 100;
        progressfill.style.width = progressFill + "%";
        statusText.firstElementChild.textContent = `${checkedCount}`;
      }, [1000]);
    });
  });
};

function updateCheckboxIcon(checkbox, isChecked) {
  const check = checkbox.nextElementSibling;
  if (isChecked) {
    check.style.display = "block";
  } else {
    check.style.display = "none";
  }
}

const toggleAccordionBox = () => {
  const accordion = document.querySelector(".accordion");
  const arrowup = document.querySelector(".Arrow-up");
  const arrowdown = document.querySelector(".Arrow-down");
  let expanded = collapesBtn.getAttribute("aria-expanded") === "true";

  collapesBtn.setAttribute("aria-expanded", !expanded);
  accordion.classList.toggle("isOpen");

  if (arrowup.classList.contains("hidden")) {
    arrowup.classList.remove("hidden");
    arrowdown.classList.add("hidden");
  } else {
    arrowup.classList.add("hidden");
    arrowdown.classList.remove("hidden");
  }
};

removeBtn.addEventListener("click", removeMessage);
collapesBtn.addEventListener("click", toggleAccordionBox);
alertTriggerBtn.addEventListener("click", toggleAlert);
popupButton.addEventListener("click", toggleMenu);

document.addEventListener("click", (event) => {
  if (!mainBox.contains(event.target)) {
    closeMenu();
  }

  if (!alertBox.contains(event.target)) {
    closeAlert();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const firstElement = document.querySelector('[tabindex="1"]');
    if (firstElement) {
      firstElement.focus();
    }
  }
});
