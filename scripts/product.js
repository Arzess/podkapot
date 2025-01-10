const products = document.querySelectorAll("li.product.f-el");

products.forEach(product => {
    product.addEventListener("click", (e)=>{
        if ((e.target.nodeName == "P" && e.target.className.includes('product-heading'))|| e.target.nodeName == "IMG" && e.target.getAttribute("alt") == "tires"){
            location.href = "product.html";
        }
    })
})

