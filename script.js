const timer = document.querySelector('#timer');
const stats = document.querySelector('#stats');
const output =  document.querySelector('#quoteOutput'); 
const userInput = document.querySelector('#quoteInput');
const checkAllStats = document.querySelector('#outputStats');

let interval = 0; 

// Every time the user are typing, we are validating the input
userInput.addEventListener('input', () => {
    const allSpan = output.querySelectorAll('span'); // all characters inside the quote as span
    const arrValue = userInput.value.split(''); // The input that the user are providing  
    let bool = true; 

    allSpan.forEach((charSpan, index) => {
        const char = arrValue[index];  // char will be the first character of the quote 
        if(char == null){
            charSpan.classList.remove('correct');
            charSpan.classList.remove('incorrect');
            bool = false;
        } 
        else if(char === charSpan.innerText){
            charSpan.classList.add('correct');
            charSpan.classList.remove('incorrect');
        }
        else{
            charSpan.classList.remove('correct');
            charSpan.classList.add('incorrect');
            bool = false;
        }   
    })

    //Game is finished and we are calling for stats
    if(bool){
        getNewQuote()
        setStats(); 
    }
})

  

function setStats(){
    const wrapper = document.createElement('div'); 
    const p = document.createElement('p'); 
    const buttonTrash = document.createElement('button'); 
    buttonTrash.classList.add('btn', 'btn-close', 'btn-primary'); 

    p.append(timer.innerText);
    p.append(buttonTrash);
    wrapper.append(p);
    checkAllStats.append(wrapper);

    buttonTrash.addEventListener('click', () => {
        wrapper.remove(checkAllStats);
    });

}



// returns the quote 
function getQuote(){
    return fetch('http://api.quotable.io/random', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => data.content)
}

// This function calls getQuote
async function getNewQuote(){
    // userInput.focus()
    startTimer()
    const quote = await getQuote();
    output.innerText = null
    quote.split('').forEach(char => {
        let character = document.createElement('span');
        character.innerText = char  
        output.appendChild(character); 
    }); 

    userInput.value = null; 

}

//Start the timer
function startTimer(){
    interval = new Date()
    setInterval(() =>{
        timer.innerHTML = Math.floor((new Date() - interval) / 1000)
    },1000)    
}

//Clearing the timer
function clearing(){
    userInput.value = null;
    interval = null
    getNewQuote()
    stats.style.display = 'none';
}

// Removing all "wrongs"/ "rights", calling for new quote
function oneMorePlease(){
    userInput.value = null; 
    const allSpan = output.querySelectorAll('span'); 
    allSpan.forEach((charSpan) => {
        charSpan.classList.remove('correct'); 
        charSpan.classList.remove('incorrect'); 
    })
    interval = null; 
    startTimer();
    stats.style.display = 'none';

}

getNewQuote(); 
