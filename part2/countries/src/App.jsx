import { useState, useEffect } from 'react';
import CountriesService from './services/CountriesService';

const apiKey = import.meta.env.VITE_SOME_KEY;

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setNewSearch] = useState('');
  const [languages, setLanguages] = useState(null);
  const [capital, setCapital] = useState(null);
  const [flag, setFlag] = useState(null);
  const [area, setArea] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [icon, setIcon] = useState(null);
  const [wind, setWind] = useState(null);

  useEffect(() => {
    if (search) {
      CountriesService.getAll().then(response => {
        setCountries(response.map(country => country.name.common));
      });
    }
  }, [search]);

  useEffect(() => {
    const filtered = countries.filter(Countries =>
      Countries.toLowerCase().includes(search.toLowerCase())
    );
    if (filtered.length === 1) {
      CountriesService.getOne(filtered[0]).then(response => {
        setLanguages(response.languages);
        setCapital(response.capital);
        setFlag(response.flags.png);
        setArea(response.area);

        CountriesService.getWeather(response.capital, response.cca2, apiKey).then(response => {
          setTemperature(response.main.temp);
          setIcon(response.weather[0].icon);
          setWind(response.wind.speed);
        });
      });
    }
  }, [search, countries]);

  const handleChange = (event) => {
    event.preventDefault();
    setNewSearch(event.target.value);
  };

  const handleCountries = (Countries) => {
    if (Countries.length >= 10) {
      return 'Too many matches, specify filter';
    } else if (Countries.length > 1 && Countries.length < 10) {
      return (
        <div>
          {Countries.map((Countries) => (
            <div key={Countries} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              {Countries}
              <button onClick={() => setNewSearch(Countries)}>Show</button>
            </div>
          ))}
        </div>
      );
    } else if (Countries.length === 1) {
      const lang = languages ? Object.values(languages).map(lang => `• ${lang}`).join('\n') : 'Loading languages...';
      const cap = capital ? Object.values(capital).join('\n') : 'Loading capital...';

      return (
        <div>
          <h1>{Countries}</h1>
          <p>Capital {cap}</p>
          <p>Area {area}</p>
          <h2>Languages</h2>
          <ul>{lang}</ul>
          <img src={flag} alt={`${Countries} flag`} />
          <h2>Weather in {cap}</h2>
          <p>Temperature {temperature} Celsius</p>
          <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="weather icon" />
          <p>Wind {wind} m/s</p>
        </div>
      );
    }
  };

  const filteredCountries = countries.filter((Countries) =>
    Countries.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      Find countries: <input value={search} onChange={handleChange} />
      <pre>{handleCountries(filteredCountries)}</pre>
    </div>
  );
};

export default App;
