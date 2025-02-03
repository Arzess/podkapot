const plans = document.querySelectorAll(".plan");
const yearlyPlans = [2980, 3380, 3780, 4180];
const monthlyPlans = [1490, 1690, 1890, 2090];
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
});
// Fill the text
const fillPlanText = (yearly) => {
  for(let i = 0; i < plans.length; i++){
    const priceElement = plans[i].querySelector(".plan-price .heading");
    const additionalTextElement = plans[i].querySelector(".plan-price .main-text");
    priceElement.innerHTML = `${monthlyPlans[i]} ₴`;
    additionalTextElement.innerHTML = yearly ? `Рік (<span class="uah-price">${yearlyPlans[i]}</span> грн економії)` : "Грн/Місяць";
    
  }
}
const planSwitch = document.querySelector(".plans .button-list");
// Change on load
document.addEventListener("DOMContentLoaded", ()=>{
  if (planSwitch.children[0].classList.contains("active")){
    fillPlanText(false);
  }
  else{
    fillPlanText(true);
  }
});

// Change on click
Array.from(planSwitch.children).forEach(button => {
  button.addEventListener("click", ()=>{
    console.log(button);
    
    if (button.querySelector("button").value == "annualy"){
      fillPlanText(true);
    }
    else{
      fillPlanText(false);
    }
  })
})
