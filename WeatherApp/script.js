const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {
    const APIKey = '127709c7e7aaa807454ce63bf7339f0a';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                cityHide.textContent = city;
                container.style.height = '404px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            const image = document.querySelector('.weather-box img'); // Corrected selector
            const temperature = document.querySelector('.weather-box .temperature'); // Corrected selector
            const description = document.querySelector('.weather-box .description'); // Corrected selector
            const humidity = document.querySelector('.weather-details .humidity span'); // Corrected selector
            const wind = document.querySelector('.weather-details .wind span'); // Corrected selector

            if (cityHide.textContent === city) {
                return;
            } else {
                cityHide.textContent = city; // Fixed assignment operator
                container.style.height = '555px';
                container.classList.add('active');
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
                error404.classList.remove('active');

                setTimeout(() => {
                    container.classList.add('active');
                }, 2500);

                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'images/clear.png';
                        break;
                    case 'Rain':
                        image.src = 'images/rain.png';
                        break;
                    case 'Snow':
                        image.src = 'images/snow.png';
                        break;
                    case 'Clouds': // Fixed case to match the API response
                        image.src = 'images/cloud.png';
                        break;
                    case 'Mist':
                    case 'Haze':
                        image.src = 'images/mist.png';
                        break;
                    default:
                        image.src = 'images/clouds.png';
                }

                temperature.innerHTML = `${parseInt(json.main.temp)}<span>℃</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`; // Fixed the typo here

                const infoWeather = document.querySelector('.info-weather');
                const infoHumidity = document.querySelector('.info-humidity');
                const infoWind = document.querySelector('.info-wind');

                const elCloneInfoWeather = infoWeather.cloneNode(true);
                const elCloneInfoHumidity = infoHumidity.cloneNode(true);
                const elCloneInfoWind = infoWind.cloneNode(true);

                elCloneInfoWeather.id = 'clone-info-weather';
                elCloneInfoWeather.classList.add('active-clone');

                elCloneInfoHumidity.id = 'clone-info-humidity';
                elCloneInfoHumidity.classList.add('active-clone');

                elCloneInfoWind.id = 'clone-info-wind';
                elCloneInfoWind.classList.add('active-clone');

                setTimeout(() => {
                    infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
                    infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
                    infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
                }, 2200);

                const CloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
                const CloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
                const CloneInfoWind = document.querySelectorAll('.info-wind.active-clone');

                if (CloneInfoHumidity.length > 0) {
                    const CloneInfoWeatherFirst = CloneInfoWeather[0];
                    const CloneInfoHumidityFirst = CloneInfoHumidity[0];
                    const CloneInfoWindFirst = CloneInfoWind[0];

                    CloneInfoWeatherFirst.classList.remove('active-clone');
                    CloneInfoHumidityFirst.classList.remove('active-clone');
                    CloneInfoWindFirst.classList.remove('active-clone');

                    setTimeout(() => {
                        CloneInfoWeatherFirst.remove();
                        CloneInfoHumidityFirst.remove();
                        CloneInfoWindFirst.remove();
                    }, 2200);
                }
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error); // Added error handling
        });
});
