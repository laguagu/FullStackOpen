import { useState, useEffect } from "react";
import axios from "axios";

const Display = (props) => {
  const { maat, haku } = props;
  const loydetyt = maat.filter((val) => {
    if (haku === "") {
      return val;
    } else if (val.name.common.toLowerCase().includes(haku.toLowerCase())) {
      return val;
    }
  });
  return (
    <section>
      {loydetyt.length < 10 ? (
        loydetyt.map((element) => {
          const name = element.name.common;
          const capital = element.capital;
          const area = element.area;
          const flag = element.flags["png"];
          if (loydetyt.length === 1) {
            return (
              <div>
                <h2 key={element.name.common}> {name} </h2>
                <p>Capital {capital} </p>
                <p>Area {area}</p>
                <h3>Languages:</h3>
                <img src={flag} alt="Country flag"></img>
              </div>
            );
          } else
            return <li key={element.name.common}>{element.name.common} </li>;
        })
      ) : (
        <p>Too many matches, please specify another filter</p>
      )}
    </section>
  );
};

function App() {
  const [haku, setHaku] = useState("");
  const [maat, setMaat] = useState([]);

  // haetaan tiedot palvelimelta
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setMaat(response.data);
    });
  }, []);

  const maanLuku = (event) => {
    setHaku(event.target.value);
  };

  const muutos = (event) => {
    event.preventDefault();
    alert(haku);
  };
  return (
    <div className="App">
      <h1>Maiden tiedot</h1>
      <form onSubmit={muutos}>
        <label>
          Find countries
          <input type="text" value={haku} onChange={maanLuku} />
        </label>
        <Display maat={maat} haku={haku} />
      </form>
    </div>
  );
}

export default App;
