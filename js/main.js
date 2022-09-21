let deckId = ''
let remaining = document.querySelector('#remaining')
let count = 0


function shuffle() {
    let select = document.getElementById('deckCount')
    let option = select.options[select.selectedIndex]
    console.log(option.value);
    let url = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${option.value}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            deckId = data.deck_id
            remaining.textContent = data.remaining
        })
        .catch(err => {
            console.log(`error ${err}`);
        })
}


function nextCard() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(res => res.json())
        .then(data => {
            let cardsRemaining = data.remaining
            remaining.textContent = cardsRemaining
            document.querySelector('#currentCard').src = data.cards[0].image
            let cardVal = data.cards[0].value
            cardVal = convertToNum(cardVal)
            keepCount(cardVal)
            document.querySelector('h4').innerText = " " + ` ${count}`
            
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}

function keepCount(val) {
    
    if(val < 7){
        count += 1
        return count
    }else if(val > 9){
        count -= 1
        return count
    }else return count
}

function convertToNum(val) {
    if (val === 'ACE') {
        return 14
    } else if (val === 'KING') {
        return 13
    } else if (val === 'QUEEN') {
        return 12
    } else if (val === 'JACK') {
        return 11
    } else {
        return Number(val)
    }
}



document.querySelector('#submit').addEventListener('click', shuffle)

document.querySelector('#nextCard').addEventListener('click', nextCard)
