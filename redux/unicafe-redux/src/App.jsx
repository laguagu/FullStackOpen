//import { useSelector, useDispatch } from 'react-redux'

const App = () => {
    const dispatchAction = (type) => {
      store.dispatch({ type });
    };
  
    const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))
  
    const addNote = (event) => {
      event.preventDefault();
      const content = event.target.note.value;
      event.target.note.value = "";
      store.dispatch(createNote(content))
    };
  
  
    const createNote = (content) => { return {
      type: 'NEW_NOTE',
      payload: {
        content,
        important: false,
        id: generateId()
      }
    }
  }
  
    const toggleImportance = (id) => {
      store.dispatch(toggleImportanceOf(id))
    }
  
    return (
      <div>
        <button onClick={() => dispatchAction("GOOD")}>good</button>
        <button onClick={() => dispatchAction("OK")}>ok</button>
        <button onClick={() => dispatchAction("BAD")}>bad</button>
        <button onClick={() => dispatchAction("ZERO")}>reset stats</button>
        <div>good {store.getState().good}</div>
        <div>ok {store.getState().ok}</div>
        <div>bad {store.getState().bad}</div>
        <div>
          <form onSubmit={addNote}>
            <input name="note" />
            <button type="submit">add</button>
          </form>
          <ul>
            {store.getState().map((note) => (
              <li key={note.id} onClick={() => toggleImportance(note.id)}>
                {note.content}{" "}
                <strong>{note.important ? "important" : ""}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

export default App;