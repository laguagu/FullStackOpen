import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  try{
    const object = { content, votes: 0 };
    const response = await axios.post(baseUrl, object);
    return response.data;
  } catch(error) {
    console.log("Cant create new anecdote",error)
  }
};

export { getAll, createNew }