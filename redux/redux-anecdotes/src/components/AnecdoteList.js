import { useSelector, useDispatch } from "react-redux";
import { voteForAnekdootti } from "../reducers/anecdoteReducer";
import useNotification from "../hooks/useNotification";


const AnecdoteList = () => {
  const { showNotification } = useNotification(); // Käytä custom hookia

  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    const filter = state.filter.toLowerCase(); // Haetaan filtteri Redux-tilasta
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter)
    );
  });

  const vote = (anecdote) => {
    showNotification(`You voted ${anecdote.content}`)
    dispatch(voteForAnekdootti(anecdote.id))
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
