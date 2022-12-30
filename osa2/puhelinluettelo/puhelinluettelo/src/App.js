import { useState, useEffect } from "react";
import noteService from "./services/notes";

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="message">
      {message}
    </div>
  )
};

const Numbers = ({ persons, deleteNumber }) => {
  return (
    <div>
      {persons.map((henkilo) => (
        <li key={henkilo.id}>
          {henkilo.name} {henkilo.number}{" "}
          <button onClick={() => deleteNumber(henkilo.id)}>Delete</button>
        </li>
      ))}
    </div>
  );
};
const Filt = (props) => {
  const { filter, filtteri, loydetty } = props;
  return (
    <form>
      Filer shown with: <input value={filter} onChange={filtteri} />
      {loydetty.length > 0 && (
        <div>
          {loydetty.map((henkilo) => (
            <li key={henkilo.id}>
              {henkilo.name} {henkilo.number}
            </li>
          ))}
        </div>
      )}
    </form>
  );
};
const Addnew = (props) => {
  const { nimenMuutos, lisaaNimi, numeronMuutos, newName, uusiNumero } = props;
  return (
    <form onSubmit={lisaaNimi}>
      <div>
        name: <input value={newName} onChange={nimenMuutos} />
      </div>
      <div>
        Number: <input value={uusiNumero} onChange={numeronMuutos} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [uusiNumero, asetaNumero] = useState("");
  const [filter, setFilter] = useState("");
  const [loydetty, setLoydetty] = useState([]);
  const [message, setMessage] = useState(null)

  // Datan haku palvelimelta
  useEffect(() => {
    noteService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  // Lisää nimen puhelinluetteloon
  const lisaaNimi = (event) => {
    event.preventDefault();
    const found = persons.findIndex(
      (element) => element.name.toLowerCase() === newName.toLowerCase()
    );

    // Tehdään henkiloObjecti, joka lisätään persons taulukkoon, jos nimeä ei löydy entuudestaan
    if (found === -1) {
      const henkiloObject = {
        name: newName,
        number: uusiNumero,
      };
      noteService.create(henkiloObject).then((response) => {});
      setPersons(persons.concat(henkiloObject));
      // tyhjentää syötekentät
      setMessage(`Added ${newName}`)
      setTimeout(() => {
        setMessage(null)
      },3000)
      setNewName("");
      asetaNumero("");
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };
  // Numeron poisto puhelinluettelosta 
  const deleteNumber = (id) => {
    const henkilo = persons.find((n) => n.id === id);
    console.log(henkilo);
    if (window.confirm(`Haluatko poistaa ${henkilo.name}`)) {
      noteService
        .delet(id)
        .then((response) => {
          setMessage(`Deletet ${henkilo.name}`)
          setTimeout(() => {
            setMessage(null)
          },3000)
          if (!response.ok) {
            throw new Error("Joku meni pieleen");
          }
        })
        .catch((error) => {
          setPersons(
            persons.filter((nimi) => (nimi.id !== id ? persons : persons.data))
          );
        });
    }

    console.log(id);
  };

  // Asettaa name input tekstin arvon NewName muuttujaan
  const nimenMuutos = (event) => {
    setNewName(event.target.value);
  };
  // numero syötteen käsittelijä
  const numeronMuutos = (event) => {
    asetaNumero(event.target.value);
  };
  const filtteri = (event) => {
    setFilter(event.target.value);
    // Etsii sisältääkö puhelinluettole syötekentän mukaisia nimiä
    const res = persons.filter((obj) =>
      Object.values(obj).some((val) => val.includes(filter))
    );
    const lista = loydetty.concat(res);
    setLoydetty(lista);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filt filter={filter} filtteri={filtteri} loydetty={loydetty} />
      <h2>Add new</h2>
      <Addnew
        nimenMuutos={nimenMuutos}
        lisaaNimi={lisaaNimi}
        numeronMuutos={numeronMuutos}
        newName={newName}
        uusiNumero={uusiNumero}
      />
      <h2>Numbers</h2>
      <div>
        <Numbers persons={persons} deleteNumber={deleteNumber} />
      </div>
    </div>
  );
};

export default App;
