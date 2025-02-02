const rating = document.querySelector("ul.stars");

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