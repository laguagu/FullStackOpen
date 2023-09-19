import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "./request";
import {
  NotificationProvider,
  NotificationContext,
} from "./NotificationContext";
import { useContext } from "react";

const AppContent = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useContext(NotificationContext);

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 3,
  });

  console.log(JSON.parse(JSON.stringify(result)));

  const anecdotes = result.data;

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({ type: "VOTE", payload: "Anekdootti äänestetty!" });
  };

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return (
      <span>
        Anecdote service not available due to problems in server
        {result.error.message}
      </span>
    );
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  return (
    <NotificationProvider>
      <Notification />
      <AnecdoteForm />
      <AppContent />
    </NotificationProvider>
  );
};

export default App;
