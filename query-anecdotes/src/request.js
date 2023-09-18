import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

export const createAnecdote = (newAnecdote) =>
  axios.post(baseUrl, newAnecdote).then((res) => res.data);

export const updateAnecdote = (uptadeAnectode) =>
  axios
    .put(`${baseUrl}/${uptadeAnectode.id}`, uptadeAnectode)
    .then((res) => res.data);