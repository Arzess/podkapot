const buttonList = document.querySelector(".details .button-list");

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
