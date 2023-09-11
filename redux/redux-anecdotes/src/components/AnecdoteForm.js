import { useDispatch } from "react-redux";
import { createAnekdootti } from "../reducers/anecdoteReducer";

const NewAnecdote = (event) => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const anecdoteContent = event.target.anecdote.value;
    event.target.anecdote.value = "";

    dispatch(createAnekdootti(anecdoteContent))
    
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button>Create</button>
      </form>
    </div>
  );
};

export default NewAnecdote