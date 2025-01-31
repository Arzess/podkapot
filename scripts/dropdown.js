const dropdownMenu = document.querySelectorAll(".dropdown");

dropdownMenu.forEach(dropdown => {
        let menu = dropdown.querySelector(".options-list");
        let selectedOption = dropdown.querySelector(".selected-option .main-text")
        dropdown.addEventListener("click", ()=>{
                dropdown.classList.toggle("opened");
        })
        menu.childNodes.forEach(option => {
                option.addEventListener("click", ()=>{
                        selectedOption.innerHTML = option.children[0].innerHTML;
                })
        })

})


