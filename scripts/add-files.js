// Add file
const addButton = document.querySelector(".add");

addButton.addEventListener("click", (e)=>{
    // e.preventDefault();
    let upload = addButton.parentElement.querySelector('input[type="file"]');
    upload.click();
})