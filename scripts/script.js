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

const closeAllModals = (keepSidebar = false) => {
    let allOpenedModals = document.querySelectorAll(".header-modal.shown");
    let allActiveButtons = document.querySelectorAll("button.active");
    allActiveButtons.forEach(b => {
        b.classList.remove("active");
    })
    allOpenedModals.forEach(modal => {
        if (keepSidebar){
            if (!modal.classList.contains("sidebar-menu")){
                modal.classList.remove("shown");
            }
        }
        else{
            modal.classList.remove("shown");
        }
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
        if (catalogModal.classList.contains("shown")){
            closeAllModals();   
            button.classList.remove("active");
        }
        else{
            closeAllModals();
            catalogModal.classList.add("shown");
            button.classList.add("active");
        }
        updateOverlay();
    });
})
const clearCategories = () => {
    catalogCategories.forEach(cat => {
        cat.classList.remove("selected")
    })
}
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
            clearCategories();
            cat.classList.add("selected")
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
        if (findPartModal.classList.contains("shown")){
            closeAllModals();
            b.classList.remove("active");
        }
        else{
            closeAllModals();
            findPartModal.classList.toggle("shown");
            b.classList.add("active");
        }
       
        // findPartModal.scrollIntoView({behavior: "smooth"})
        updateOverlay();

    })
})

// Language button
const languageButton = document.querySelectorAll(".header .language");
const languageModal = document.querySelectorAll(".header .language-modal");

languageButton.forEach(b => {
    b.addEventListener("click", ()=>{
        if (b.parentElement.querySelector(".header-modal").classList.contains("shown")){
            closeAllModals(true);
        }
        else{
            closeAllModals(true);
            b.parentElement.querySelector(".header-modal").classList.add("shown");
            
        }
        updateOverlay();
    })
})



// Account button
const accountButton = document.querySelectorAll("button.account");
const accountModal = document.querySelector(".header .account-modal");
const logOutButton = document.querySelectorAll(".header .account-modal .log-out")
const accountSignInButton = document.querySelectorAll(".account-list.sign-out li:first-child button");
const accountSignUpButton = document.querySelectorAll(".account-list.sign-out li:last-child button");
const accountLogOut = (e) => {
    e.closest(".header-modal").classList.add("signed-out")
}
const openAuthorisationForm = (modal, type) => {
    closeAllModals();
    modal.classList.remove("shown");
    authorisationForm.classList.add("shown");
    adjustAuthorisationForm(type)
    updateHelpTextReference();
    attachHelpTextEventListener();
    if (type == "sign-in"){
        authorisationForm.classList.remove("sign-up");
        authorisationForm.classList.add("sign-in");
    }
    else{
        authorisationForm.classList.remove("sign-in");
        authorisationForm.classList.add("sign-up");
        authorisationForm.classList.add("buyer")
    }
    updateOverlay();
}
accountSignInButton.forEach(b => {
    b.addEventListener("click", ()=>{
        openAuthorisationForm(b.closest(".header-modal"), "sign-in")
    })
})
accountSignUpButton.forEach(b => {
    b.addEventListener("click", ()=>{
        openAuthorisationForm(b.closest(".header-modal"), "sign-up")
    })
})

logOutButton.forEach(b => {
    b.addEventListener("click", accountLogOut(b));
})

accountButton.forEach(button => {
    let accountModal = button.parentElement.querySelector(".account-modal")
    button.addEventListener("click", () => {
        if (accountModal.classList.contains("shown")){
            closeAllModals(true);
        }
        else{
            closeAllModals(true);
            accountModal.classList.add("shown");
            
        }
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
    // Dropdown check
    const openedDropdowns = document.querySelectorAll(".dropdown.opened");
    const clickedInsideDropdown = Array.from(openedDropdowns).some(drop => drop.contains(e.target));
    if (!clickedInsideDropdown){
        openedDropdowns.forEach(drop => {
            drop.classList.remove("opened");
        })
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


// "To-the-top" button logic
document.addEventListener("DOMContentLoaded", ()=>{
    document.body.insertAdjacentHTML('beforeend', `<button class="to-the-top hidden">
      <img
        src="./images/icons/arrow-right.svg"
        alt="arrow"
        style="transform: rotate(-90deg)"
      />
    </button>`);
    const toTheTop = document.querySelector(".to-the-top");
    toTheTop.addEventListener("click", ()=>{
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    })

// Header scroll
const scrollHeader = () => {
    if (window.scrollY > document.querySelector(".header").clientHeight){
        document.querySelector(".header").classList.add("floating")
    }
    else{
        document.querySelector(".header").classList.remove("floating")
    }
}
// To the top button scroll
const scrollToTheTop = (top) => {
    if (window.scrollY > 100){
        top.classList.remove("hidden");
    }
    else{
        top.classList.add("hidden");
    }
}


    scrollHeader();
    scrollToTheTop(toTheTop);
    
    window.addEventListener("scroll", ()=>{
        scrollHeader();
        scrollToTheTop(toTheTop);
    })
    
    
})


