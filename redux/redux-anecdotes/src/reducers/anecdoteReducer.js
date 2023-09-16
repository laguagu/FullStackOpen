import { createSlice } from "@reduxjs/toolkit";
import { createNew, getAll } from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteForAnekdootti: (state, action) => {
      const id = action.payload;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
      const updatedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      return state
        .map((anecdote) => (anecdote.id === id ? updatedAnecdote : anecdote))
        .sort((a, b) => b.votes - a.votes);
    },
    appendAnecdoot(state, action) {
      state.push(action.payload);
    },
    setAnecdoot(state, action) {
      return action.payload;
    },
  },
});

export const createAnekdootti = (content) => {
  return async dispatch => {
    const newAnecdote = await createNew(content);
    dispatch(appendAnecdoot(newAnecdote));
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await getAll()
    dispatch(setAnecdoot(anecdotes))
  }
}

export const { voteForAnekdootti, appendAnecdoot, setAnecdoot } =
  anecdoteSlice.actions;

export default anecdoteSlice.reducer;
