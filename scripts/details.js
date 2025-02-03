// ** Tag list **
tags = document.querySelectorAll(".details .tag-list .tag");
cancel = document.querySelector(".details .cancel");
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
cancel.addEventListener("click", ()=>{
    deleteTags(true);
})


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
