const sellers = document.querySelectorAll("li.seller.f-el");

sellers.forEach(seller => {
    seller.addEventListener("click", ()=>{
        location.href = "seller.html";
    })
})

