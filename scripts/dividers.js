const services = document.querySelectorAll(".available-services-list li");
const row = document.querySelector(".row-dividers");
const column = document.querySelector(".column-dividers");
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
    if (window.innerWidth <= 1300){
        // Row check
        if (row.children.length != 5){
            row.innerHTML = "";
            row.innerHTML += divider.repeat(5);
        }
        // Column check
        if (column.children.length != 1){
            column.innerHTML = ""
            column.innerHTML += divider;  
        }
    }
    else{
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
    }
}

window.onload = () => {
    adjustSliders();
    setUpDividers();
    passDividers();
    window.addEventListener("resize", ()=>{
        setUpDividers();
        adjustSliders();
        passDividers();
    });
};

