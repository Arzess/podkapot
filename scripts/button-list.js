const buttonList = document.querySelector(".button-list");
const updateButtons = () => {
    // Removes every active class from each button
    Array.from(buttonList.children).forEach(button => {
        button.classList.remove("active");
    });
}

Array.from(buttonList.children).forEach(button => {
    button.addEventListener("click", ()=>{
        // One at a time
        updateButtons();
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
