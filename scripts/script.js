import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';
const mobileWidth = 500;

const setHeaderHeight = () => {
    // Set the header height
    const headerElement = document.querySelector(".header:has(.search-bar-input)");
    document.documentElement.style.setProperty('--header-height', `${headerElement.clientHeight}px`);
}

document.addEventListener("DOMContentLoaded", ()=>{
  // Set the scrollbar width
  const documentWidth = document.documentElement.clientWidth;
  const scrollbarWidth = Math.abs(window.innerWidth - documentWidth);
  document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
  setHeaderHeight();

})

window.addEventListener("resize", ()=>{
  setHeaderHeight();
})

// --- Header ---
const resetChangingIcons = () => {
    const changing = document.querySelectorAll(".changing-icon");
    changing.forEach(c => {
        c.classList.remove("active");
    })
}

// Authorisation form
const authorisationForm = document.querySelector(".authorisation-form");
let topText = authorisationForm.querySelector(".top p");
const authorisationCloseButton = authorisationForm.querySelector(".top button");
let bottomText = authorisationForm.querySelector(".help p");

authorisationCloseButton.addEventListener("click", () => {
  closeAllModals();
  authorisationForm.classList.remove("shown");
  updateOverlay();
});

const adjustAuthorisationForm = (type) => {
  authorisationForm.classList.remove("seller", "buyer");
  authorisationForm.classList.remove("sign-up", "sign-in");
  if (type === "sign-up") {
    topText.innerHTML = "Реєстрація";
    bottomText.innerHTML = `Уже маєте акаунт? <span><a href="#" class="small-text">Увійти</a></span>`;
    authorisationForm.classList.add("sign-up", "buyer");
  } else {
    topText.innerHTML = "Вхід";
    bottomText.innerHTML = `Ще не зареєстровані? <span><a href="#" class="small-text">Створити аккаунт</a></span>`;
    authorisationForm.classList.add("sign-in");
  }

  clearButtons();
  if (authorisationForm.classList.contains("buyer")) {
    buyerButton.classList.add("selected");
  } else if (authorisationForm.classList.contains("seller")) {
    sellerButton.classList.add("selected");
  }
};

authorisationForm.querySelector(".help p").addEventListener("click", (e) => {
  if (e.target.matches("a")) {
    e.preventDefault();
    e.stopPropagation();

    if (authorisationForm.classList.contains("sign-in")) {
      authorisationForm.classList.remove("sign-in", "seller", "buyer");
      adjustAuthorisationForm("sign-up");
    } else {
      authorisationForm.classList.remove("sign-up", "seller", "buyer");
      adjustAuthorisationForm("sign-in");
    }
  }
});

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



// *** Menu ***

const closeAllModals = (keepSidebar = false) => {
    const popUps = document.querySelectorAll(".pop-up.shown");
    const headerModals = document.querySelectorAll(".header-modal.shown")
    let allOpenedModals = [...popUps, ...headerModals];
    
    document.querySelectorAll(".pop-up.shown");
    let allActiveButtons = document.querySelectorAll("button.active");
    allActiveButtons.forEach(b => {
        b.classList.remove("active");
    })
    allOpenedModals.forEach(modal => {
        if (keepSidebar){
            if (!modal.classList.contains("sidebar-menu")){
                modal.classList.remove("shown");
                modal.classList.remove("seller");
                modal.classList.remove("buyer");
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
  const popUps = document.querySelectorAll(".pop-up");
  const headerModals = document.querySelectorAll(".header-modal")
  let openedModals = [...popUps, ...headerModals];
    return openedModals.some(modal => modal.classList.contains("shown"));
};

const updateOverlay = (header = false) => {
    if (checkModals()) {
        document.body.classList.add("overlay-header");
        document.body.classList.add("overlay");
        document.body.classList.add("steady");
    } else {
        document.body.classList.remove("overlay-header");
        document.body.classList.remove("overlay");
        document.body.classList.remove("steady");
    }
};

// Burger menu

const burgerMenu = document.querySelector(".header .menu");
const sideBar = document.querySelector(".sidebar-menu");
const sideBarClose = sideBar.querySelector(".close")
burgerMenu.addEventListener("click", ()=>{
    if (document.querySelector(".shopping-cart.shown") != null || document.querySelector(".find-part.shown") != null){
      closeAllModals();
    }
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
const catalogHeading = document.querySelector(".catalog-modal .get-back-heading .sub-minor-heading");
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
            resetChangingIcons();
        }
        else{
            closeAllModals();
            catalogModal.classList.add("shown");
            document.querySelectorAll(".catalog.primary-button.changing-icon").forEach(b => {
              b.classList.add("active");
            }) 
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
            resetChangingIcons();
        }
        else{
            closeAllModals();
            findPartModal.classList.toggle("shown");
            document.querySelectorAll(".find-part-button.primary-button.changing-icon").forEach(button => {
              button.classList.add("active");
            })
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
      let headerInputList = document.querySelector(".header:has(.search-bar) .header-list");
      
        if (b.parentElement.querySelector(".header-modal").classList.contains("shown")){
          headerInputList.classList.remove("language-active");
          closeAllModals(true);
        }
        else{
          headerInputList.classList.add("language-active");
            closeAllModals(true);
            b.parentElement.querySelector(".header-modal").classList.add("shown");
            
        }
        updateOverlay(true);
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
    updateOverlay(true);
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
    let accountModal = button.parentElement.querySelector(".account-modal");  
    let headerInputList = document.querySelector(".header:has(.search-bar) .header-list");
    button.addEventListener("click", () => {
        if (accountModal.classList.contains("shown")){
          headerInputList.classList.remove("account-active");
          closeAllModals(true);
        }
        else{
          closeAllModals(true);
          headerInputList.classList.add("account-active");
            accountModal.classList.add("shown");
            
        }
        updateOverlay(true);
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
const inputText = shoppingCart.querySelectorAll(".shopping-cart .count-text");
const counterMore = shoppingCart.querySelectorAll(".count-more");
const counterLess = shoppingCart.querySelectorAll(".count-less");
const makeOrder = shoppingCart.querySelectorAll("button.apply-button");

makeOrder.forEach(o => {
  o.addEventListener("click", ()=>{
    shoppingCart.classList.add("application");
  })
})

const checkSaved = (input) => {
  if (input.value == ""){
        input.value = 1;
        checkCounter(input.parentElement.querySelector(".count-less"), true)
    }
    else if (input.value == 1){
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
document.addEventListener("DOMContentLoaded", () => {
  inputText.forEach(t => {
    t.addEventListener("input", () => checkInputCounter(t));
    t.addEventListener("change", () => checkSaved(t));
  });
});

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
        updateOverlay();
    });
})

closeCart.addEventListener("click", () => {
    shoppingCart.classList.remove("shown");
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
    const clickedInsideSidebar = document.querySelector(".sidebar-menu").contains(e.target);

    if (clickedInsideSidebar && e.target.nodeName != "I"){
      if (Array.from(document.querySelectorAll(".sidebar-modal.shown")).length > 0){
        closeAllModals(true)
      }
      return;
    }
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
      <i class="bi bi-arrow-up"></i>
    </button>`);
    const toTheTop = document.querySelector(".to-the-top");
    toTheTop.addEventListener("click", ()=>{
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    })

// Header scroll
// const scrollHeader = () => {
//     if (window.scrollY > document.querySelector(".header").clientHeight){
//         document.querySelector(".header").classList.add("floating");
        
//     }
//     else{
//         document.querySelector(".header").classList.remove("floating")
//     }
// }
// To the top button scroll
const scrollToTheTop = (top) => {
    if (window.scrollY > 100){
        top.classList.remove("hidden");
        setHeaderHeight();
    }
    else{
        top.classList.add("hidden");
        setHeaderHeight();
    }
}


    // scrollHeader();
    scrollToTheTop(toTheTop);
    
    window.addEventListener("scroll", ()=>{
        // scrollHeader();
        scrollToTheTop(toTheTop);
    })
    
    
})
// -- Other scripts --

// Add files
const addButton = document.querySelector(".add");
if (addButton != null){
    addButton.addEventListener("click", (e)=>{
        // e.preventDefault();
        let upload = addButton.parentElement.querySelector('input[type="file"]');
        upload.click();
    })
}

// Button list plans

const buttonListPlans = document.querySelector(".plans .button-list");
if (buttonListPlans != null){
    const updateButtons = (list) => {
        // Removes every active class from each button
        Array.from(list.children).forEach(button => {
            button.classList.remove("active");
        });
    }
    
    Array.from(buttonListPlans.children).forEach(button => {
        button.addEventListener("click", ()=>{
            // One at a time
            updateButtons(buttonListPlans);
            button.classList.add("active");
        })
    })
}

// Details button list

const buttonList = document.querySelector(".details .button-list");
if (buttonList != null){
    const updateButtons = (list) => {
        // Removes every active class from each button
        Array.from(list.children).forEach(button => {
            button.classList.remove("active");
        });
    }
    
    Array.from(buttonList.children).forEach(button => {
        button.addEventListener("click", ()=>{
            // One at a time
            updateButtons(buttonList);
            button.classList.add("active");
        })
    })
    
    
    // Location change
    const grid = buttonList.children[1];
    const rows = buttonList.children[0];
    
    grid.addEventListener("click", ()=>{
            location.href = "details.html"
    })    
    rows.addEventListener("click", ()=>{
        location.href = "details-rows.html"
    })
    
}
// Products

const products = document.querySelectorAll(".product.f-el");

if (products.length != 0){
  Array.from(products).forEach(p => {
    let manufacturer = p.querySelector(".manufacturer");
    manufacturer.addEventListener('mouseover', ()=>{
        let bottomValue = -manufacturer.clientHeight/2 - 8;   
        if (bottomValue < -35){
          manufacturer.style.bottom = `${bottomValue}px`
        }
        else if(bottomValue == -33){
          manufacturer.style.bottom = '-1.25rem'
          
        }
        else{
          manufacturer.style.bottom = `0`;
        }
    });
    manufacturer.addEventListener('mouseout', ()=>{
      manufacturer.style.bottom = '0px';
    })
  })  
}

// ** Tag list **

const tags = document.querySelectorAll(".details .tag-list .tag");
const cancel = document.querySelectorAll(".details .cancel");
if (tags.length != 0){
    const deleteTags = (all, removeTag = "") => {
        if (all){
            Array.from(tags).forEach(tag => {
                tag.remove();
            })
            // Hide cancel button
            cancel.classList.remove("shown");
        }
        else{
            removeTag.remove();
        }
    }
    
    
    
    // Remove the tag on close
    Array.from(tags).forEach(tag => {
        tag.querySelector(".close").addEventListener("click", ()=>{
            deleteTags(false, tag);
        });
    })
    
    // Cancel button
    if (cancel.length != 0){
      cancel.forEach(c => {
        c.addEventListener("click", ()=>{
          deleteTags(true);
      })
      })  
    }
    
    
    document.addEventListener("DOMContentLoaded", ()=>{
        const buttonListDetails = document.querySelector(".details-options-list .button-list");
        if (buttonListDetails.children[0].classList.contains("active")){
            const detailsRowProducts = document.querySelectorAll(".details .product .img-name");
            detailsRowProducts.forEach(p => {
                p.addEventListener("click", ()=>{
                    location.href="product.html";
                });
            })
        }
    })
    

}

// Dividers

const services = document.querySelectorAll(".available-services-list li");
if (services != null){
    
const row = document.querySelector(".row-dividers");
const column = document.querySelector(".column-dividers");
if (row != null){
    const setUpDividers = () => {
        const { width, height } = services[0].getBoundingClientRect();
        // Set up rows
        row.style.gap = `${height}px`;
        row.style.padding = `${height}px 0 ${height}px 0`;
    
        // Set up columns
        column.style.gap = `${width}px`;
        column.style.padding = `0 ${width}px`;
    }
    const passDividers = () => {
        const divider = `<div class="divider"></div>`
        // if (window.innerWidth <= 1300){
            // Row check
            // if (row.children.length != 5){
            //     row.innerHTML = "";
            //     row.innerHTML += divider.repeat(5);
            // }
            // // Column check
            // if (column.children.length != 1){
            //     column.innerHTML = ""
            //     column.innerHTML += divider;  
            // }
        // }
        // else{
            // Row check
            if (row.children.length != 2){
                row.innerHTML = "";
                row.innerHTML += divider.repeat(2);
            }
            // Column check
            if (column.children.length != 3){
                column.innerHTML = ""
                column.innerHTML += divider.repeat(3);  
            } 
        // }
    }
    document.addEventListener("DOMContentLoaded", ()=>{
        adjustSliders();
        setUpDividers();
        passDividers();
        window.addEventListener("resize", ()=>{
            setUpDividers();
            adjustSliders();
            passDividers();
        });
    })
    
}
}

// Dropdown

const dropdownMenu = document.querySelectorAll(".dropdown");

dropdownMenu.forEach(dropdown => {
        let menu = dropdown.querySelector(".options-list");
        let selectedOption = dropdown.querySelector(".selected-option .main-text")
        dropdown.addEventListener("click", ()=>{
                if (dropdown.classList.contains("opened")){
                        dropdown.classList.remove("opened");
                }
                else{
                        dropdownMenu.forEach(drop => {
                                drop.classList.remove("opened");
                        })
                        dropdown.classList.add("opened");
                }
        })
        menu.childNodes.forEach(option => {
                option.addEventListener("click", ()=>{
                        dropdown.classList.add("no-placeholder")
                        selectedOption.innerHTML = option.children[0].innerHTML;
                })
        })

})

// Plans

const plans = document.querySelectorAll(".plan");
const yearlyPlans = [2980, 3380, 3780, 4180];
const monthlyPlans = [1490, 1690, 1890, 2090];
if (plans.length != 0){
plans.forEach(plan => {
    let apng = plan.querySelector(".image-and-price img");
    let apngSrc = apng.getAttribute("data-src");
    let apngSrcStatic = apng.getAttribute("data-src-static");
    apng.src = apngSrcStatic;
    apng.addEventListener('mouseenter', () => {
      apng.src = apngSrc;
    });
    apng.addEventListener('mouseleave', () => {
      apng.src = apngSrcStatic;
    });
});
// Fill the text
const fillPlanText = (yearly) => {
  for(let i = 0; i < plans.length; i++){
    const priceElement = plans[i].querySelector(".plan-price .heading");
    const additionalTextElement = plans[i].querySelector(".plan-price .main-text");
    priceElement.innerHTML = `${monthlyPlans[i]} ₴`;
    additionalTextElement.innerHTML = yearly ? `Рік (<span class="uah-price">${yearlyPlans[i]}</span> грн економії)` : "Грн/Місяць";
    
  }
}
const planSwitch = document.querySelector(".plans .button-list");
// Change on load
document.addEventListener("DOMContentLoaded", ()=>{
  if (planSwitch.children[0].classList.contains("active")){
    fillPlanText(false);
  }
  else{
    fillPlanText(true);
  }
});

// Change on click
Array.from(planSwitch.children).forEach(button => {
  button.addEventListener("click", ()=>{
    console.log(button);
    
    if (button.querySelector("button").value == "annualy"){
      fillPlanText(true);
    }
    else{
      fillPlanText(false);
    }
  })
})

}

// Product gallery

const imageSourcesProductGallery = [
    './images/yellow-car.jpg',
    './images/yellow-car.jpg',
    './images/yellow-car.jpg',
    './images/yellow-car.jpg',
  ];
window.addEventListener("load", () => {
  const swiperWrapperProductList = document.querySelector('.product-section .gallery-main-image .swiper-wrapper');
  const galleryListProduct = document.querySelector('.product-section .gallery-list');
    if (swiperWrapperProductList != null){
      imageSourcesProductGallery.forEach((src, index) => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        const zoomContainer = document.createElement('div');
        zoomContainer.classList.add('swiper-zoom-container');
        const img = document.createElement('img');
        img.src = src;
        zoomContainer.appendChild(img);
        slide.appendChild(zoomContainer);
        swiperWrapperProductList.appendChild(slide);
        const thumbnail = document.createElement('li');
        if (index === 0) thumbnail.classList.add('current');
        const thumbImg = document.createElement('img');
        thumbImg.src = src;
        thumbnail.appendChild(thumbImg);
        galleryListProduct.appendChild(thumbnail);
        thumbnail.addEventListener('click', () => {
            productGallery.slideToLoop(index);
        });
    });
    
        
          const productGallery = new Swiper('.gallery-main-image', {
            slidesPerView: 1,
            loop: true,
            centeredSlides: 'false',
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            zoom: {
              maxRatio: 5,
            },
            on: {
              slideChange: function (swiper) {
                updateThumbnailsProducts(swiper.realIndex);
              },
              init: function () {
                checkControlsProducts();
              }
            }
          });

          document.querySelectorAll('.gallery-main-image .swiper-slide').forEach(slide => {
            slide.addEventListener('dblclick', () => {
              if (productGallery.zoom.scale !== 1) {
                productGallery.zoom.out();
                if (window.innerWidth <= 500){
                  document.body.classList.remove('steady');
                }
              } else {
                productGallery.zoom.in();
                
                if (window.innerWidth <= 500){
                  document.body.classList.add('steady');
                }
              }
            });
          });
          function checkControlsProducts() {
            const productGalleryControls = document.querySelector(".controls-list");
            if (imageSourcesProductGallery.length === 1) {
              productGalleryControls.classList.add("hidden");
            }
          }
        
          function updateThumbnailsProducts(activeIndex) {
            const thumbnails = document.querySelectorAll('.gallery-list li');
            thumbnails.forEach((thumbnail, index) => {
              if (index === activeIndex) {
                thumbnail.classList.add('current');
              } else {
                thumbnail.classList.remove('current');
              }
            });
          }
    }
});


// Anchor buttons seller

const anchorButtons = document.querySelector(".seller-actions");
if (anchorButtons != null){
    Array.from(anchorButtons.children).forEach(anchor => {
        anchor.addEventListener("click", ()=>{
            const scrollObject = document.querySelector(`section${anchor.children[0].getAttribute("data-scroll-to")}`);   
            scrollObject.scrollIntoView({
                behavior: "smooth",
            })
        })
    })    
}


// Stars

const rating = document.querySelector("ul.stars");
if (rating != null){

    const clearStars = (hovered = true) => {
        if (hovered){
            Array.from(rating.children).forEach(star=>{
                star.classList.remove("hovered");
            })
        }
        else{
            Array.from(rating.children).forEach(star=>{
                star.classList.remove("filled");
            })
        }
    }
    const changeStars = (index, stars, fill) => {
        if (fill){
            clearStars(false);
            clearStars(true);
            for (let i = 0; i <= index; i++){
                stars.children[i].classList.add("filled");
            }
        } 
        else{
            clearStars();
            for (let i = 0; i <= index; i++){
                if (!stars.children[i].classList.contains("filled")){
                    stars.children[i].classList.add("hovered");
           
                }
                 }
        }  
    } 
    
    Array.from(rating.children).forEach(star => {
        let index = -1;
        // When the mouse hovers over a star the rest of the stars fill up halfway (hover)
        star.addEventListener("mouseover", ()=>{
    
            index = Array.from(rating.children).indexOf(star);
            changeStars(index, rating, false)
        })
        // When the mouse leaves the star they all become outlined
        rating.addEventListener("mouseleave", ()=>{
            clearStars();
        })
        // When you click on a star it and all the stars before it fill up
        star.addEventListener("click", ()=>{
            rating.classList.add("clicked");
            changeStars(index, rating, true);
        })
    })
}

// Swiper 2 cards

document.addEventListener("DOMContentLoaded", () => {
  // To fix the "grid: 2" problem with SwiperJS
  const casesElement = document.querySelector(".successful-cases-list")
  if (casesElement != null){
    const swiperContainer2 = document.querySelector('.gallery-container-2');
    const customPagination2 = document.querySelector('[data-pagination="two"]');
  
    const swiperTwo = new Swiper(swiperContainer2, {
      breakpoints: {
        1300: {
          slidesPerView: 2,
          grid: {
            rows: 1,
          },
        },
        0: {
          slidesPerView: 1,
          grid: {
            rows: 2,
          },
        },
      },
      loop: false,
      spaceBetween: 24,
      on: {
        init: function (swiperTwo) {
          createPaginationTwo(swiperTwo, customPagination2);
        },
        slideChange: function (swiperTwo) {
          updatePaginationTwo(swiperTwo, customPagination2);
        },
      },
    });
  
  }
  function createPaginationTwo(swiper, paginationContainer) {
    if (!paginationContainer) return;

    paginationContainer.innerHTML = '';
    let totalSlides = swiper.slides.length - 1;
    if (window.innerWidth < 1300){
      totalSlides =  Math.round(swiper.slides.length/2);
      
    }
    for (let i = 0; i < totalSlides; i++) {
      const li = document.createElement('li');
      li.classList.add('page');
      const a = document.createElement('a');
      a.href = '#';
      li.appendChild(a);
      paginationContainer.appendChild(li);

      li.addEventListener('click', (e) => {
        e.preventDefault();
        swiper.slideToLoop(i);
      });
    }

    updatePaginationTwo(swiper, paginationContainer);
  }

  function updatePaginationTwo(swiper, paginationContainer) {
    if (!paginationContainer) return;

    const pages = paginationContainer.querySelectorAll('.page');
    pages.forEach((page, index) => {
      if (index === swiper.realIndex) {
        page.classList.add('selected');
      } else {
        page.classList.remove('selected');
      }
    });
  }
});

// Swiper 4 cards

document.addEventListener("DOMContentLoaded", () => {
  // To fix the "grid: 2" problem with SwiperJS
  const catalogElement = document.querySelector(".catalog-list")
  if (catalogElement != null){
      const swiperContainer = document.querySelector('.gallery-container-4');
      const customPagination = document.querySelector('[data-pagination="four"]');
    
      const swiperFour = new Swiper(swiperContainer, {
        grid: {
          rows: 1,
        },
        breakpoints: {
          1300: {
            slidesPerView: 4,
            grid: {
              rows: 1,
            },
          },
          0: {
            slidesPerView: 2,
            spaceBetween: 16,
            grid: {
              rows: 2,
            },
          },
        },
        loop: false,
        spaceBetween: 24,
        on: {
          init: function (swiperFour) {
            createPaginationFour(swiperFour, customPagination);
          },
          slideChange: function (swiperFour) {
            updatePaginationFour(swiperFour, customPagination);
          },
        },
      });
  }
  
  function createPaginationFour(swiper, paginationContainer) {
    if (!paginationContainer) return;

    paginationContainer.innerHTML = '';
    let totalSlides = Math.round(swiper.slides.length/2) + 1;
    if (window.innerWidth < 1300){
      totalSlides = Math.round(swiper.slides.length/4) + 1;
    }

    for (let i = 0; i < totalSlides; i++) {
      const li = document.createElement('li');
      li.classList.add('page');
      const a = document.createElement('a');
      a.href = '#';
      li.appendChild(a);
      paginationContainer.appendChild(li);

      li.addEventListener('click', (e) => {
        e.preventDefault();
        swiper.slideToLoop(i);
      });
    }

    updatePaginationFour(swiper, paginationContainer);
  }

  function updatePaginationFour(swiper, paginationContainer) {
    if (!paginationContainer) return;

    const pages = paginationContainer.querySelectorAll('.page');
    pages.forEach((page, index) => {
      if (index === swiper.realIndex) {
        page.classList.add('selected');
      } else {
        page.classList.remove('selected');
      }
    });
  }
});

// Hero swiper


const swiperContainerHero = document.querySelector('.hero .gallery-container');
const desktopPaginationHero = document.querySelector('.hero [data-pagination="desktop"]');
const mobilePaginationHero = document.querySelector('.hero [data-pagination="mobile"]');

if (swiperContainerHero != null){
  const heroSwiper = new Swiper(swiperContainerHero, {
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      init: function (swiper) {
        createPaginationHero(swiper, desktopPaginationHero);
        createPaginationHero(swiper, mobilePaginationHero);
      },
      slideChange: function (swiper) {
        updatePaginationHero(swiper, desktopPaginationHero);
        updatePaginationHero(swiper, mobilePaginationHero);
      }
    }
  });
  
}

function createPaginationHero(swiper, paginationContainer) {
  if (!paginationContainer) return;

  paginationContainer.innerHTML = '';
  const totalSlides = swiper.slides.length - swiper.loopedSlides * 2 || swiper.slides.length;

  for (let i = 0; i < totalSlides; i++) {
    let li = document.createElement('li');
    li.classList.add('page');
    let a = document.createElement('a');
    a.href = '#';
    li.appendChild(a);
    paginationContainer.appendChild(li);

    li.addEventListener('click', (e) => {
      e.preventDefault();
      swiper.slideToLoop(i);
    });
  }

  updatePaginationHero(swiper, paginationContainer);
}

function updatePaginationHero(swiper, paginationContainer) {
  if (!paginationContainer) return;

  let pages = paginationContainer.querySelectorAll('.page');
  pages.forEach((page, index) => {
    if (index === swiper.realIndex) {
      page.classList.add('selected');
    } else {
      page.classList.remove('selected');
    }
  });
}


// Text field

const textFields = document.querySelectorAll(".mdc-text-field");
textFields.forEach((textFieldElement) => {
    new mdc.textfield.MDCTextField(textFieldElement);
});


const forms = document.querySelectorAll("form");
forms.forEach(form => {
  form.addEventListener("submit", (event) => {
    let isValid = true;
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
      const errorElement = document.getElementById(input.id + "-error");
      const errorMessage = input.getAttribute("data-error-message");
  
      if (input.required && !input.value.trim()) {
        input.classList.add("mdc-text-field--invalid");
        errorElement.textContent = "Це поле потрібно";
        isValid = false;
      } else if (
        input.pattern &&
        !new RegExp(input.pattern).test(input.value)
      ) {
        input.classList.add("mdc-text-field--invalid");
        errorElement.textContent = errorMessage || "Invalid";
        isValid = false;
      } else {
        input.classList.remove("mdc-text-field--invalid");
        errorElement.textContent = "";
      }
    });
    if (!isValid) {
      event.preventDefault();
    }
  });
})

// Open contacts

const openContacts = document.querySelectorAll("button.open-contacts");
if (openContacts.length != 0){
  openContacts.forEach(b => {
    b.addEventListener("click", ()=>{
      const phoneNumberContact = b.closest("ul").querySelector("p.phone-number") || b.parentElement.querySelector(".contact-name p:last-child");
      phoneNumberContact.innerHTML = phoneNumberContact.getAttribute("data-full-phone");
    })
  })
}

// Selectize

$('.selectize-select').selectize({
  sortField: 'text', 
  create: false,
  placeholder: $(this).attr("data-placeholder"),
});

// Show all button details


const showAllDetails = document.querySelectorAll(".details .show-all-button");

if (Array.from(showAllDetails).length != 0){
  showAllDetails.forEach(show => {
    show.addEventListener("click", ()=>{
      show.classList.toggle("clicked")
      show.parentElement.querySelector("ul").classList.toggle("opened")
    })
  })
}


// Details filter

const filterButtonDetails = document.querySelector(".filter-button");
const filterModal = document.querySelector(".filter");
const filterApply = document.querySelector(".filter .filter-top .primary-button.outline");
if (filterButtonDetails != null){
  filterButtonDetails.addEventListener("click", ()=>{
    filterModal.classList.add("shown");
    document.body.classList.add("steady");
  })
  // Apply all
  filterApply.addEventListener("click", (e)=>{
    e.preventDefault();
    filterModal.classList.remove("shown");
    document.body.classList.remove("steady");
  })

}

// Filter details same max height
const detailsOffers = document.querySelector(".details .offers")
const adjustFilter = () => {
  if (window.innerWidth > 500){
    const offersHeight = detailsOffers.scrollHeight;
    filterModal.style.maxHeight = `${offersHeight}px`;
  }
  else{
    filterModal.style.maxHeight = 'unset';
  }
}
if (detailsOffers){
  window.addEventListener("resize", ()=>{
    adjustFilter();
  })
  window.onload(()=>{
    adjustFilter();
  })
}


// Expand the text

const expandText = document.querySelectorAll(".open-text");

if (expandText.length != 0){
  expandText.forEach(b => {
    b.addEventListener("click", ()=>{
      console.log("fdfd");
      
      b.parentElement.classList.add("expanded");
    })
  })
}

// Pop-ups
const popUps = document.querySelectorAll(".pop-up");
if (popUps.length != 0){
  Array.from(popUps).forEach(pop => {
    const close = pop.querySelector(".top button");
    if (close){
      close.addEventListener("click", ()=>{
        pop.classList.remove("shown")
        closeAllModals();
        updateOverlay();
      })
    }
  })
}


// One click purchase button

const oneClick = document.querySelector(".product-section .options .primary-button.outline");
if (oneClick){
  oneClick.addEventListener("click", ()=>{
    document.querySelector(".pop-up.one-click").classList.add("shown");
    updateOverlay();
  })
}

const messageSeller = document.querySelector(".seller-card .primary-button")

if(messageSeller){
  messageSeller.addEventListener("click", ()=>{
    document.querySelector(".pop-up.seller-message").classList.add("shown");
    updateOverlay();
  })
}


const checkPrice = document.querySelector(".product-section .options .get-price")
if (checkPrice){
  checkPrice.addEventListener("click", ()=>{
    document.querySelector(".pop-up.get-price").classList.add("shown");
    updateOverlay();
  })
}

// Catalog list

const catalogListShow = document.querySelectorAll(".auto-catalog.list-section .show-all-button")

if (catalogListShow.length != 0){
  Array.from(catalogListShow).forEach(cls => {
    cls.addEventListener("click", ()=>{
      cls.parentElement.querySelector(".link-list").classList.toggle("shown");
      cls.classList.toggle("opened");
    })
  })
}