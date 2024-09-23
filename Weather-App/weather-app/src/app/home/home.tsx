export default function Main() {
    return (
      <div>     
        <h1>Weather App</h1>
        <div className="search-container">
          <input
            type="search"
            className="search-box"
            placeholder="Enter city"
            aria-label="Search City"
          />
          <button className="btn">Search</button>
        </div>
  
        <div className="unit-selection">
          <label>
            <input type="radio" name="unit" className="radio_button" value="celsius" />
            Celsius
          </label>
  
          <label>
            <input type="radio" name="unit" className="radio_button" value="fahrenheit" />
            Fahrenheit
          </label>
        </div>
  
        <div className="main_container">
          <h2>London, UK</h2>
          <h3>Current Temperature</h3>
          <h3>Feels Like: <b>4.39°C</b></h3>
          <h3>Max: <b>3.13°C</b></h3>
          <h3>Min: <b>4.39°C</b></h3>
          <h3>Scattered Clouds</h3>
          <img src="github.png" alt="Weather icon" />
        </div>
      </div>
    );
  }
  