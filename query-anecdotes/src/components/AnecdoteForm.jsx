/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../request";
import { useContext } from "react";
import { NotificationContext } from "../NotificationContext";


const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useContext(NotificationContext);

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
    onError: (error) => {
      console.log("VIRHE",error)
    }
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    if (content.length < 5) {
      dispatch({type:"VOTE", payload: "Too short anecdote, must have length 5 or more"})

    } else {
      event.target.anecdote.value = "";
      newAnecdoteMutation.mutate(
      { content, votes: 0 },
      {
        onSuccess: () => {
          dispatch({type: "VOTE", payload: "Uusi anekdootti luotu!"})
        },
        onError: (error) => {
          console.log("VIRHE", error);
          dispatch({type: "VOTE", payload: "Virhe anekdootin luonnissa!"})
        }
      }
      );
    }
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
