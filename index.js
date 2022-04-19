const URL = 'https://api.thedogapi.com/v1/images/search'
const dogName = document.getElementById('name')
const dogImg = document.getElementById('img')
const dogHeight = document.getElementById('height')
const dogLife = document.getElementById('life_span')
const dogBred = document.getElementById('bred_for')
function callFetch() {
    fetch(URL)
 .then(res => res.json())
 .then(dogData => {
     
    //  console.log(dogData[0])
    //  console.log(dogData[0].breeds[0].name)
     dogPic(dogData)
 })
//  .then(dogData => dogPic(dogData))
}

 const dogPic = (dogData) => {
     console.log(dogData);
    //  dogName.textContent = dogData[0].breeds[0].name;
    let test;
    test = dogData[0].breeds[0];
     if(test == undefined) {
         callFetch();
     } else {
        dogName.textContent = dogData[0].breeds[0].name;
     }
     dogImg.src = dogData[0].url;
     dogHeight.textContent = dogData[0].breeds[0].height.imperial
     dogLife.textContent = dogData[0].breeds[0].life_span
     dogBred.textContent = dogData[0].breeds[0].bred_for
 }


const likeBtn = document.getElementById("like");
let clicks = 0;
likeBtn.addEventListener("click", () => {
    clicks++;
    likeBtn.innerHTML = `<button><i class="far fa-thumbs-up"></i>  LOVE IT  ${clicks} likes`;
})

const nopeBtn = document.getElementById("nope");
nopeBtn.addEventListener("click", () => {
    callFetch();
    clicks = 0;
    likeBtn.innerHTML = '<btn id="like"> <i class="far fa-thumbs-up"></i>  LOVE IT  </btn>'
})

console.log("hello");


callFetch()

