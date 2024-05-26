import { catsData } from '/data.js'

const emotionRadios = document.getElementById("emotion-radios")
const getImageBtn = document.getElementById("get-image-btn")
const gifsOnlyOption = document.getElementById("gifs-only-option")
const memeModalInner = document.getElementById("meme-modal-inner")
const memeModal = document.getElementById("meme-modal")
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

emotionRadios.addEventListener('change', highlightCheckedOption)

memeModalCloseBtn.addEventListener('click',closeModal)

getImageBtn.addEventListener('click', renderCat)
 
function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for(let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

 function closeModal(){
    memeModal.style.display = "none"
 }

 function renderCat(){
    const catObject = getSingleCatObject()
    memeModalInner.innerHTML = `
      <img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        >`
    memeModal.style.display = "flex"   
}

function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    if(catsArray.length == 1){
      return catsArray[0]
    }else{
     const randomNumber = Math.floor(Math.random()*catsArray.length)
     return catsArray[randomNumber]
    }
 
 }
 
function getMatchingCatsArray(){
    const isGif = gifsOnlyOption.checked
    
  if(document.querySelector('input[type="radio"]:checked')){
    const checkedRadio = document.querySelector('input[type="radio"]:checked').value
    const matchingCatArray = catsData.filter(function(cat){
        if(isGif){
            return cat.emotionTags.includes(checkedRadio) && cat.isGif
        }else{
            return cat.emotionTags.includes(checkedRadio)
        }
        
    })
    return matchingCatArray
  }
}


function getEmotionsArray(cats){
    const emotionArray = []

    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if(!emotionArray.includes(emotion)){
                emotionArray.push(emotion)
            }
            
        }
        
    }
   return emotionArray 
}

function renderEmotionRadios(cats){
   let radioitems = ""
   const emotions = getEmotionsArray(cats)
   for(let emotion of emotions){
        radioitems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input 
                type="radio"
                id="${emotion}"
                value="${emotion}"
                name="emotions"
            >

        </div>`
    
   }
   emotionRadios.innerHTML = radioitems
}
renderEmotionRadios(catsData)
