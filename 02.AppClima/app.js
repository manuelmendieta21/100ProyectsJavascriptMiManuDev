document.addEventListener("DOMContentLoaded", () => {
    let bodyElem = document.querySelector("body");

    // Cambiar la imagen de fondo al cargar la página
    let randNum = Math.ceil(Math.random() * 5);
    let bgImageUrl = `url('img/bg${randNum}.jpg')`;
    bodyElem.style.backgroundImage = bgImageUrl;

    let cityInput = document.querySelector(".textoinput");
    cityInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            fetchDataFromApi();
        }
    });

    let apiData = {
        url: "https://api.openweathermap.org/data/2.5/weather?q=",
        key: "124b92a8dd9ec01ffb0dbf64bc44af3c"
    };

    cityInput.value = "Bogota";
    fetchDataFromApi();
    cityInput.value = "";

    function fetchDataFromApi() {
        let insertedCity = cityInput.value;
        fetch(`${apiData.url}${insertedCity}&appid=${apiData.key}`)
            .then((response) => response.json())
            .then((data) => addDataToDom(data));
    }

    let cityName = document.querySelector(".city-name");
    let cityTemp = document.querySelector(".weather-deg");
    let cityCond = document.querySelector(".weather-condition");
    let cityHumidity = document.querySelector(".humidity");
    let dateInfo = document.querySelector(".date-info");

    function addDataToDom(data) {
        cityName.innerHTML = `${data.name}, ${data.sys.country}`;
        cityTemp.innerHTML = `${Math.round(data.main.temp - 273.15)}°C`;
        cityCond.innerHTML = data.weather[0].description;
        cityHumidity.innerHTML = `Humedad: ${data.main.humidity}%`;

        // Formatear y mostrar la fecha actual
        let currentDate = new Date();
        let options = { weekday: 'short', day: '2-digit', month: 'long' };
        let formattedDate = currentDate.toLocaleDateString('es-ES', options);
        dateInfo.innerHTML = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1); // Capitalizar el primer caracter del día de la semana
    }
});
