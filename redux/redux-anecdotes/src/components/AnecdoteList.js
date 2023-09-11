import { useSelector, useDispatch } from "react-redux";
import { voteForAnekdootti } from "../reducers/anecdoteReducer";


const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    const filter = state.filter.toLowerCase(); // Haetaan filtteri Redux-tilasta
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter)
    );
  });
  
    return(
        <div>
        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => dispatch(voteForAnekdootti(anecdote.id))}>vote</button>
            </div>
          </div>
        ))}
      </div>
    );
}

export default AnecdoteList;