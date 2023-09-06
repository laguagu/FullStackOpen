import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("<BlogForm /> Creating blogform with correct value fields", async () => {
  const onSubmit = jest.fn();

  render(<BlogForm onSubmit={onSubmit} />);

  const title = screen.getByPlaceholderText("title");
  const author = screen.getByPlaceholderText("author");
  const url = screen.getByPlaceholderText("url");
  const sendButton = screen.getByText("Create");

  await userEvent.type(title, "testing title");
  await userEvent.type(author, "testing author");
  await userEvent.type(url, "testing url");

  await userEvent.click(sendButton);

  // Tarkista, että createBlog-funktiota kutsutaan oikein
  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith({
    title: "testing title",
    author: "testing author",
    url: "testing url",
  });
});
