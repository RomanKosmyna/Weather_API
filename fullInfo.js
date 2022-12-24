// class Constructor {
//     constructor() {
//
//     }
// }
const url = new URL (location.href);
const cityName = url.searchParams.get('cityname');
const apiKey = '0c0a1b8844360759cd616e0903cea4dc';

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
    .then(value => value.json())
    .then(object => {
            const fullInfoContainer = document.createElement('div');
            fullInfoContainer.classList.add('fullInfoContainer');
            document.body.appendChild(fullInfoContainer);
            const cityTitle = document.createElement('div');
            cityTitle.classList.add('cityTitle');
            cityTitle.innerText = `City: ${cityName}`;
            fullInfoContainer.appendChild(cityTitle);
            for (const objectKey in object) {
                if (typeof object[objectKey] !== "object") {
                    const info = document.createElement('div');
                    info.classList.add('infoBlock');
                    info.innerText = `${objectKey}: ${object[objectKey]}`;
                    fullInfoContainer.appendChild(info);
                } else if (typeof object[objectKey] === 'object') {
                    const info = document.createElement('div');
                    info.classList.add('infoBlock');
                    info.innerText = `${objectKey}:`;
                    fullInfoContainer.appendChild(info);

                    for (const objectKeyValue in object[objectKey]) {
                        if (typeof object[objectKey][objectKeyValue] !== "object") {
                            const objectKeyInfo = document.createElement('div');
                            objectKeyInfo.classList.add('objectKeyInfo');
                            objectKeyInfo.innerText = `${objectKeyValue} - ${object[objectKey][objectKeyValue]}`;
                            info.appendChild(objectKeyInfo);
                        } else if (typeof object[objectKey][objectKeyValue] === "object") {
                            for (const key in object[objectKey][objectKeyValue]) {
                                const infoKey = document.createElement('div');
                                infoKey.classList.add('objectKeyInfo');
                                infoKey.innerText = `${key} - ${object[objectKey][objectKeyValue][key]}:`;
                                info.appendChild(infoKey);
                            }
                        }
                    }
                }
            }
})




// fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latInfo}&lon=${lonInfo}&appid=${apiKey}`)
//     .then(value => value.json())
//     .then(value => {
//         console.log(value);
//     })