// ---------DOM----------
const inputContainer = document.createElement('div');
inputContainer.classList.add('inputContainer');
const cityInput = document.createElement('input');
cityInput.classList.add('cityInput');
cityInput.setAttribute('type','text');
cityInput.setAttribute('placeholder', 'Type down name of a city');
const cityInputBtn = document.createElement('button');
cityInputBtn.setAttribute('id','cityNameBtn');
cityInputBtn.innerText = 'Search';
inputContainer.append(cityInput, cityInputBtn);
document.body.appendChild(inputContainer);
// City Name information
const apiKey = '0c0a1b8844360759cd616e0903cea4dc';

cityInputBtn.addEventListener('click', function () {
    let cityName = null;
    cityName = cityInput.value;
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${5}&appid=${apiKey}`)
        .then(value => value.json())
        .then(cityWeatherArray => {
            const mainContainer = document.createElement('div');
            mainContainer.classList.add('mainContainer')
            document.body.appendChild(mainContainer);
            for (const cityWeatherElement of cityWeatherArray) {
                const cityContainer = document.createElement('div');
                cityContainer.classList.add('cityContainer');
                for (const cityWeatherElementKey in cityWeatherElement) {
                    const cityInfo = document.createElement('div');
                    cityInfo.classList.add('cityInfo');
                    if (typeof cityWeatherElement[cityWeatherElementKey] === 'object') {
                        const localNameBlock = document.createElement('div');
                        localNameBlock.classList.add('localNameBlock');
                        cityInfo.innerText = `${cityWeatherElementKey.charAt(0).toUpperCase() + cityWeatherElementKey.slice(1)}: `;
                        cityContainer.appendChild(cityInfo);
                        for (const key in cityWeatherElement[cityWeatherElementKey]) {
                            cityInfo.appendChild(localNameBlock);
                            const localName = document.createElement('div');
                            localName.classList.add('localName');
                            localName.innerText = `${cityWeatherElement[cityWeatherElementKey][key]}`;
                            localNameBlock.appendChild(localName);
                        }
                    }
                    if (typeof cityWeatherElement[cityWeatherElementKey] !== 'object') {
                        cityInfo.innerText = `${cityWeatherElementKey.charAt(0).toUpperCase() + cityWeatherElementKey.slice(1)}: ${cityWeatherElement[cityWeatherElementKey]}`;
                        cityContainer.appendChild(cityInfo);
                    }
                    mainContainer.appendChild(cityContainer);
                }
                const a = document.createElement('a');
                a.innerText = 'See full weather information';
                a.href = `./fullInfo.html?cityname=${cityName}`;
                a.classList.add('aForMoreInfo');
                cityContainer.appendChild(a);
            }
        })
    cityInputBtn.disabled = 'true';
})