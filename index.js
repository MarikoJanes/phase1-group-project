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
     dogHeight.textContent = `Height: Up To ${dogData[0].breeds[0].height.imperial}`;
     dogLife.textContent = `Life span: Average ${dogData[0].breeds[0].life_span}`;
     dogBred.textContent = `Bred for: ${dogData[0].breeds[0].bred_for}`;
     const reloadBtn = document.getElementById("reload");
     reloadBtn.addEventListener("click", () => {
         callFetch();
     })
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




callFetch();




const breedUrl = 'https://dog.ceo/api/breeds/list/all';
const select = document.getElementById("breed-dropdown");
const div = document.getElementById("dog_image");

function fetchDogCeo() {
    fetch(breedUrl)
    .then(res => res.json())
    .then(data => {
        for (const element in data.message) {
            addList(element)
        }
    });
}


function addList(element) {
    const option = document.createElement("option");
    option.innerHTML = `<option value="${element}">${element}</option>`;
    select.append(option);
}

function filterBreed() {
    let selectedValue = select.value;
    console.log(selectedValue);
    select.addEventListener("change", () => {
        selectedValue = select.value;
        console.log(selectedValue);
        showDogImg(selectedValue);
    })
};

function showDogImg(dogName) {
    fetch(`https://dog.ceo/api/breed/${dogName}/images`)
    .then(res => res.json())
    .then(data => {
        
        // const img = document.createElement("img");
        // img.setAttribute("id", "dog");
        // img.src = data.message[0];
        // div.append(img);
        const imgs = document.querySelectorAll(".extraImg");
        imgs[0].src = data.message[0];
        imgs[0].style.display = "block";
        imgs[0].style.margin = "auto";
        extraImg(data.message)  
        const extraBtn = document.getElementById("extra");
        extraBtn.style.display = "block";



    })
}

function extraImg(arr) {
    const btn = document.getElementById('extra');
    const imgs = document.querySelectorAll(".extraImg");
    let num;
    btn.addEventListener("click", () => {
        for(let i = 0; i < imgs.length; i++) {
            
            num = Math.floor(Math.random()* arr.length);
           
            console.log(num);
            console.log(arr[num]);
            imgs[i].src = arr[num];
            imgs[i].style.display = "block";
            imgs[i].style.display = "inline";
        }
    })
}

fetchDogCeo();
filterBreed();

