const plans = document.querySelectorAll(".plan");

plans.forEach(plan => {
    let apng = plan.querySelector(".image-and-price img");
    let apngSrc = apng.getAttribute("data-src");
    let apngSrcStatic = apng.getAttribute("data-src-static");
    apng.src = apngSrcStatic;
    apng.addEventListener('mouseenter', () => {
      apng.src = apngSrc;
    });
    apng.addEventListener('mouseleave', () => {
      apng.src = apngSrcStatic;
    });
})