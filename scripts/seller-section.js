const newSellerProducts = document.querySelectorAll(".companys-products .product");

newSellerProducts.forEach(p => {
    p.querySelector(".img-name").addEventListener("click", ()=>{
        location.href = "product.html";
    });
});

// Anchor buttons

const anchorButtons = document.querySelector(".seller-actions");

Array.from(anchorButtons.children).forEach(anchor => {
    anchor.addEventListener("click", ()=>{
        const scrollObject = document.querySelector(anchor.children[0].getAttribute("data-scroll-to"));
        console.log(scrollObject);
        
        scrollObject.scrollIntoView({
            behavior: "smooth",
        })
    })
})