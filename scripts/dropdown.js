const dropdownMenu = document.querySelector(".dropdown");
const dropdown = dropdownMenu.querySelector(".options-list");

dropdownMenu.addEventListener("click", ()=>{
        dropdownMenu.classList.toggle("opened");
})