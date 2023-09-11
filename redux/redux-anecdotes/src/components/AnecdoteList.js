import { useSelector, useDispatch } from "react-redux";
import { voteForAnekdootti } from "../reducers/anecdoteReducer";


const AnecdoteList = () =>  {
    const anecdotes = useSelector((state) => state);
    const dispatch = useDispatch();
  
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