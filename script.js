const btn  = document.getElementById('btn');
const input = document.getElementById('input');



btn.addEventListener('click', function(e) {
e.preventDefault()
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
    + input.value +
    "&units=metric&appid="
+ `94ca1e13f881b85bab2f807dcf28bbf2`)   
.then((response) => response.json())
.then((data) => {
    const {name, main: {temp, feels_like}, weather: [{description}]} = data;
    document.querySelector('.display').innerHTML = `
    Name of the country/city: ${name}<br>
    Temperature: ${temp}<br>
    Description: ${description}<br>
    Feels like: ${feels_like}<br>
    `   
})
.catch(() => {
    alert('Not found: ' + input.value)
    return; 
})
    input.value="";
})


