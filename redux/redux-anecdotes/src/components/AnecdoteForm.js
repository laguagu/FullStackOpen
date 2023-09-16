import { useDispatch } from "react-redux";
import { createAnekdootti } from "../reducers/anecdoteReducer";
import { useState } from "react";
import useNotification from "../hooks/useNotification";

const NewAnecdote = () => {
  const [anecdote, setAnecdote] = useState("");
  const dispatch = useDispatch();
  const { showNotification } = useNotification();

  const addAnecdote = (event) => {
    event.preventDefault();

    if (anecdote.trim() !== "") {
      // Varmistetaan, että syöte ei ole tyhjä
      dispatch(createAnekdootti(anecdote));
      showNotification(`You created ${anecdote}`);
      setAnecdote("");
    }
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        {" "}
        {/* Käytä onSubmitia sen sijaan, että lisäisit onClickin napille */}
        <div>
          <input
            type="text"
            name="anecdote"
            value={anecdote}
            onChange={(e) => setAnecdote(e.target.value)}
          />
        </div>
        <button type="submit">Create</button>{" "}
        {/* Lisää type="submit" napille */}
      </form>
    </div>
  );
};

export default NewAnecdote;
