import { useDispatch } from "react-redux";
import NewAnecdote from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { useEffect } from "react";

import { getAll } from "./services/anecdotes";
import { setAnecdoot } from "./reducers/anecdoteReducer";


const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    getAll().then(anecdotes => {
      dispatch(setAnecdoot(anecdotes))
    })
  })

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter/>
      <AnecdoteList />
      <NewAnecdote />
    </div>
  );
};

export default App;
