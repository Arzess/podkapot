const authorisationForm = document.querySelector(".authorisation-form");
let topText = authorisationForm.querySelector(".top p");
const authorisationCloseButton = authorisationForm.querySelector(".top button");
let helpText = authorisationForm.querySelector(".help p span a");
let bottomText = authorisationForm.querySelector(".help p");

authorisationCloseButton.addEventListener("click", () => {
  closeAllModals();
  authorisationForm.classList.remove("shown");
  updateOverlay();
});

const updateHelpTextReference = () => {
  helpText = authorisationForm.querySelector(".help p span a");
};

const attachHelpTextEventListener = () => {
  helpText.addEventListener("click", (e) => {
    if (e.target.matches(".help p span a")) {
      e.preventDefault();
      e.stopPropagation();
  
      if (authorisationForm.classList.contains("sign-in")) {
        authorisationForm.classList.remove("sign-in");
        adjustAuthorisationForm("sign-up");
        authorisationForm.classList.add("sign-up");
        authorisationForm.classList.add("buyer");
      } else {
        authorisationForm.classList.remove("sign-up");
        adjustAuthorisationForm("sign-in");
        authorisationForm.classList.add("sign-in");
        authorisationForm.classList.remove("buyer");
        authorisationForm.classList.remove("seller");
      }
    }
  });
};

const adjustAuthorisationForm = (type) => {
  if (type === "sign-up") {
    topText.innerHTML = "Реєстрація";
    bottomText.innerHTML = `Уже маєте акаунт? <span><a href="#" class="small-text">Увійти</a></span>`;
  } else {
    topText.innerHTML = "Вхід";
    bottomText.innerHTML = `Ще не зареєстровані? <span><a href="#" class="small-text">Створити аккаунт</a></span>`;
  }
  updateHelpTextReference();
  attachHelpTextEventListener();
};

attachHelpTextEventListener();

// Switch logic
const authorisationSwitch = authorisationForm.querySelector(".switch");
const sellerButton = authorisationSwitch.children[1];
const buyerButton = authorisationSwitch.children[0];

const clearButtons = () => {
  [sellerButton, buyerButton].forEach((c) => {
    c.classList.remove("selected");
  });
};

sellerButton.addEventListener("click", () => {
  if (!authorisationForm.classList.contains("seller")) {
    clearButtons();
    sellerButton.classList.add("selected");
    authorisationForm.classList.remove("buyer");
    authorisationForm.classList.add("seller");
  }
});

buyerButton.addEventListener("click", () => {
  if (!authorisationForm.classList.contains("buyer")) {
    clearButtons();
    buyerButton.classList.add("selected");
    authorisationForm.classList.remove("seller");
    authorisationForm.classList.add("buyer");
  }
});
