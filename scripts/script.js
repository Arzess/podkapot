const mobileWidth = 500;
// --- Header ---
const resetChangingIcons = () => {
    const changing = document.querySelectorAll(".changing-icon");
    changing.forEach(c => {
        c.classList.remove("active");
    })
}
const logos = document.querySelectorAll(".logo");

logos.forEach(logo => {
    logo.addEventListener("click", ()=>{
        location.href = "index.html";
    })
})


// *** Menu ***

const closeAllModals = () => {
    let allOpenedModals = document.querySelectorAll(".header-modal.shown");
    allOpenedModals.forEach(modal => {
        modal.classList.remove("shown")
    })
    updateOverlay();
}


// Returns true if one or more modals are opened at the same time
const checkModals = () => {
    const openedModals = document.querySelectorAll(".header-modal");
    return Array.from(openedModals).some(modal => modal.classList.contains("shown"));
};

const updateOverlay = () => {
    const main = document.querySelector(".main");
    if (checkModals()) {
        main.classList.add("overlay");
    } else {
        main.classList.remove("overlay");
    }
};

// Burger menu

const burgerMenu = document.querySelector(".header .menu");
const sideBar = document.querySelector(".sidebar-menu");
const sideBarClose = sideBar.querySelector(".close")
burgerMenu.addEventListener("click", ()=>{
    sideBar.classList.add("shown");
    updateOverlay();
})
sideBarClose.addEventListener("click", ()=>{
    sideBar.classList.remove("shown");
    updateOverlay();
})



// Catalog button
const catalogButton = document.querySelectorAll(".catalog.primary-button");
const catalogModal = document.querySelector(".catalog-modal.header-modal");
const closeButton = document.querySelector(".catalog-modal .close");
const catalogCategories = document.querySelectorAll(".catalog-modal .category-list li");
const catalogHeading = document.querySelector(".catalog-modal .get-back-heading h6");
const getBackButton = document.querySelector(".catalog-modal .get-back");
const defaultText = "Каталог товарів";
closeButton.addEventListener("click", ()=>{
    catalogModal.classList.remove("shown");
    catalogHeading.innerHTML = defaultText;
    catalogModal.classList.remove("section-opened");
    resetChangingIcons();
    updateOverlay();
})
// For all catalog button
catalogButton.forEach(button => {
    button.addEventListener("click", () => {
        closeAllModals();
        catalogModal.classList.toggle("shown");
        button.classList.add("active");
        updateOverlay();
    });
})
catalogCategories.forEach(cat => {
    // For mobile
    if (window.innerWidth <= mobileWidth){
        cat.addEventListener("click", ()=>{
            catalogModal.classList.add("section-opened");
            // Copy contents
            catalogHeading.innerHTML = cat.querySelector(".main-text").innerHTML;
        })
    }
    else{
        cat.addEventListener("click", ()=>{
            location.reload();
        })
    }
})
getBackButton.addEventListener("click", ()=>{
    catalogModal.classList.remove("section-opened");
    // Set the default value
    catalogHeading.innerHTML = defaultText;
})

// Find part button
const findPartButton = document.querySelectorAll(".find-part-button");
const findPartModal = document.querySelector(".find-part.header-modal");
const findPartClose = document.querySelector(".find-part.header-modal .close");

findPartClose.addEventListener("click", ()=>{
    findPartModal.classList.remove("shown");
    updateOverlay();
    resetChangingIcons();
})


findPartButton.forEach(b => {
    b.addEventListener("click", ()=>{
        closeAllModals();
        findPartModal.classList.toggle("shown");
        findPartModal.scrollIntoView({behavior: "smooth"})
        updateOverlay();
        b.classList.add("active");
    })
})

// Language button
const languageButton = document.querySelectorAll(".header .language");
const languageModal = document.querySelector(".header .header-modal");
languageButton.forEach(b => {
    b.addEventListener("click", ()=>{
        closeAllModals();
        languageModal.classList.add("shown");
        updateOverlay();
    })
})

// Account button
const accountButton = document.querySelectorAll("button.account");
const accountModal = document.querySelector(".header .account-modal");
const logOutButton = document.querySelector(".header .account-modal .log-out")
const accountSignInButton = document.querySelector(".account-list.sign-out li:first-child button");
const accountSignUpButton = document.querySelector(".account-list.sign-out li:last-child button");
const accountLogOut = () => {
    accountModal.classList.add("signed-out")
}
const openAuthorisationForm = (type) => {
    accountModal.classList.remove("shown");
    authorisationForm.classList.add("shown");
    adjustAuthorisationForm(type)
    updateHelpTextReference();
    attachHelpTextEventListener();
    if (type == "sign-in"){
        authorisationForm.classList.add("sign-in");
    }
    else{
        
        authorisationForm.classList.add("sign-up");
        authorisationForm.classList.add("buyer")
    }
}
accountSignInButton.addEventListener("click", ()=>{
    openAuthorisationForm("sign-in")
})

accountSignUpButton.addEventListener("click", ()=>{
    openAuthorisationForm("sign-up")
})
logOutButton.addEventListener("click", accountLogOut)
accountButton.forEach(button => {
    button.addEventListener("click", () => {
        closeAllModals();
        accountModal.classList.toggle("shown");
        updateOverlay();
    });
});

// Shopping cart
const checkCounter = (c, p) => {
    if (p){
        c.classList.add("inactive")
    }
    else{
        c.classList.remove("inactive")
    }
}
const shoppingCartButton = document.querySelectorAll(".header .cart");
const shoppingCart = document.querySelector(".shopping-cart");
const closeCart = shoppingCart.querySelector(".shopping-cart-nav button");

const counterMore = shoppingCart.querySelectorAll(".count-more");
const counterLess = shoppingCart.querySelectorAll(".count-less");

const checkSaved = (input) => {
    if (input.value == ""){
        input.value = 1;
        checkCounter(input.parentElement.querySelector(".count-less"), true)
    }
}
const checkInputCounter = (input) => {
    if (input.value < 1){
        input.value = "";
    }
    else{
        checkCounter(input.parentElement.querySelector(".count-less"), false)
    }
    
}


counterMore.forEach(c => {
    checkCounter(c, false);
    c.addEventListener("click", ()=>{
        c.parentElement.querySelector(".count-less").classList.remove("inactive");
        c.parentElement.querySelector(".count-text").value++;
        checkCounter(c, false);
    })
})

counterLess.forEach(c => {
    c.addEventListener("click", ()=>{
        let counter = c.parentElement.querySelector(".count-text");
        if (counter.value == 1){
            checkCounter(c, true);
        }
        else if (counter.value == 2){
            counter.value--;
            checkCounter(c, true);
        }
        else{
            counter.value--;
        }
    })
})

shoppingCartButton.forEach(b => {
    b.addEventListener("click", () => {
        closeAllModals();
        shoppingCart.classList.add("shown");
        document.body.classList.add("steady");
        updateOverlay();
    });
})

closeCart.addEventListener("click", () => {
    shoppingCart.classList.remove("shown");
    document.body.classList.remove("steady");
    updateOverlay(); 
});


// --- Footer ---
const footerSections = document.querySelectorAll(".footer-info-list.mobile .info-block");
footerSections.forEach(footerSection => {
    footerSection.addEventListener("click", ()=>{
        footerSection.classList.toggle("opened");  
    })
})


// Close on ESC
document.addEventListener("keydown", (e)=>{
    if (e.key === "Escape"){
        closeAllModals();
        document.body.classList.remove("steady");
        resetChangingIcons();
    }
})
// To leave modal if clicked somewhere else
let opened = false;
document.addEventListener("click", (e) => {
    const openedModals = document.querySelectorAll(".header-modal.shown");
    const clickedInsideModal = Array.from(openedModals).some(modal => modal.contains(e.target));
    if (!clickedInsideModal && !e.target.closest("button")) {
        closeAllModals();
        document.body.classList.remove("steady");
        resetChangingIcons();
    }
    opened = Array.from(openedModals).some(modal => modal.classList.contains("shown"));
});


// Other function
const checkInputName = (i) => {
    const placeholder = i.parentElement.querySelector(".placeholder");
    console.log(placeholder);
    
    if (i.value == ""){
        placeholder.classList.remove("hidden");
    }
    else{
        placeholder.classList.add("hidden");
    }
}


const adjustSliders = () => {
    const sliderShow = document.querySelectorAll(".list-section-additional-features");
    sliderShow.forEach(s => {
        if (s.children.length > 0 && s.children[0].children.length > 0) {
            if (s.children[0].classList.contains("slider-show")){
                const childWidth = s.children[0].children[0].clientWidth;
                const slider = s.children[0];
                slider.style.width = `calc(50% + ${childWidth/2}px)`;
            
            }
           }
    });
};

window.onload = () => {
    adjustSliders();
    window.addEventListener("resize", adjustSliders);
};

