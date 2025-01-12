const buttonListPlans = document.querySelector(".plans .button-list");
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