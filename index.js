import catsData from './data.js';

const emotionRadios = document.getElementById('emotion-radios');
const getImageBtn = document.getElementById('get-image-btn');
const gifOnlyOption = document.getElementById('gif-only-option');
const memeModalInner = document.getElementById('meme-modal-inner');
const memeModal = document.getElementById('meme-modal');
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn');

emotionRadios.addEventListener('change', handleEmotionSelection);
memeModalCloseBtn.addEventListener('click', closeModal);
getImageBtn.addEventListener('click', renderCat);

function handleEmotionSelection(event){
    const oldHighlightedRadio = emotionRadios.querySelector('.highlight');
    oldHighlightedRadio?.classList.remove('highlight');
    
    const newRadioElement = event.target.parentElement;
    newRadioElement.classList.add('highlight');
}

function closeModal(){
    memeModal.style.display = 'none';
}

function renderCat() {
    const selectedCat = getSingleCatObject();
    if (selectedCat) {
        memeModalInner.innerHTML = `
        <img 
            class='cat-img' 
            src='./images/${selectedCat.image}'
            alt='${selectedCat.alt}'
        >
        <a class='download-btn' href='./images/${selectedCat.image}' download='${selectedCat.image}'>
            <img class='icon-img' src='./images/download-icon.png' alt='Download button'>
        </a>`;

        memeModal.style.display = 'flex';
    }
}

function getSingleCatObject(){
    const catsArray = getMatchingCats();
    if(catsArray) {
        const randomIndex = Math.floor(Math.random() * catsArray.length);
        return catsArray[randomIndex];
    }
}

function getMatchingCats(){  
    const checkedRadio = document.querySelector('input[type="radio"]:checked');
    if(checkedRadio) {
        const selectedEmotion = checkedRadio.value;
        const isGifOnly = gifOnlyOption.checked;
        
        const matchingCatsArray = catsData.filter(cat => {
            if(isGifOnly)
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
            else
                return cat.emotionTags.includes(selectedEmotion);
        });

        return matchingCatsArray; 
    }  
}

function getEmotionsArray(cats){
    return [...new Set(cats.flatMap(cat => cat.emotionTags))];
}

function renderEmotionsRadios(cats){
    emotionRadios.innerHTML = getEmotionsArray(cats).map(emotion => `
        <div class='radio'>
            <label for='${emotion}'>${emotion}</label>
            <input type='radio' id='${emotion}' value='${emotion}' name='emotions'>
        </div>
    `).join('');
}

renderEmotionsRadios(catsData);