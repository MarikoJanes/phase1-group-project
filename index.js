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
     dogPic(dogData)
 })
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
     dogHeight.textContent = `Height: Up To ${dogData[0].breeds[0].height.imperial} inches`;
     dogLife.textContent = `Life span: Average ${dogData[0].breeds[0].life_span}`;
     dogBred.textContent = `Bred for: ${dogData[0].breeds[0].bred_for}`;
 }
//moved outside of dog pic function because of odd DOM manipulation on reloads
 const reloadBtn = document.getElementById("reload");
     reloadBtn.addEventListener("click", () => {
         callFetch();
         likeBtn.innerHTML = `<i class="far fa-thumbs-up"></i>  LOVE IT`;
})

const likeBtn = document.getElementById("like");
let clicks = 0;
likeBtn.addEventListener("click", (e) => {
    clicks++;
    
    likeBtn.innerHTML = `<i class="far fa-thumbs-up"></i>  LOVE IT  ${clicks} likes`;
})

const nopeBtn = document.getElementById("nope");
nopeBtn.addEventListener("click", (e) => {
    callFetch();
    //clicks = 0;
    likeBtn.innerHTML = '<i class="far fa-thumbs-up"></i>  LOVE IT'
})

const breedUrl = 'https://dog.ceo/api/breeds/list/all';
const select = document.getElementById("breed-dropdown");
const div = document.getElementById("dog_image");

function fetchDogCeo() {
    fetch(breedUrl)
    .then(res => res.json())
    .then(data => {
        for (const element in data.message) {
            addList(element);
            if(data.message[element].length>0){
                console.log(data.message[element][0]);
                data.message[element].forEach(subBreed => addList(element+ "-" + subBreed)); 
                }
            }
        })
    }

function addList(element) {
    const option = document.createElement("option");
    option.innerHTML = `<option value="${element}">${element}</option>`;
    select.append(option);
}

function filterBreed() {
    let selectedValue;
    select.addEventListener("change", () => {
        selectedValue = select.value;
        if(selectedValue.includes("-")) {
            let newValue = selectedValue.split("-");
            showDogImg(newValue[0]);
        } else {
        showDogImg(selectedValue);
        };
        const hiddenImgs = document.querySelectorAll(".extraImg");
        for(let i = 1; i < hiddenImgs.length; i++) {
            hiddenImgs[i].style.display = "none";
        }
    })
};

function showDogImg(dogName) {
    fetch(`https://dog.ceo/api/breed/${dogName}/images`)
    .then(res => res.json())
    .then(data => {
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

//stored all function calls in one location
callFetch();
fetchDogCeo();
filterBreed();

