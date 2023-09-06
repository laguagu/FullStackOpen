/* eslint-disable */
import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from "./Blog";
import Togglable from "./Togglable";
import blogService from "../services/blogs";

test("render title,", () =>{
    const blog = {
        title: "Moi"
    }

    render(<Blog blog={blog}/>)

    const element = screen.getByText('Moi')
    expect(element).toBeDefined()
    //screen.debug()

})

// Tee testi, joka varmistaa että blogin näyttävä komponentti renderöi blogin titlen
