const news = document.querySelectorAll("li.news-piece.f-el");

news.forEach(piece => {
    piece.addEventListener("click", ()=>{
        location.href = "details.html";
    })
})

