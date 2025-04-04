import axios from 'axios'
const AllUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const OneUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'
const Opneweather = 'https://api.openweathermap.org/data/2.5/weather?q='
const getAll = () => {
    const request = axios.get(AllUrl)
    return request.then(response => response.data)
}
const getOne = (country) => {
    const request = axios.get(`${OneUrl}/${country}`)
    return request.then(response => response.data)
}
const getWeather = (capital, cca2, apiKey) => {
    const request = axios.get(`${Opneweather}${capital},${cca2}&appid=${apiKey}&units=metric`)
    return request.then(response => response.data)
}

export default { getAll, getOne, getWeather }