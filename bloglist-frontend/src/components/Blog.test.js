/* eslint-disable */
import React from "react"
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from "./Blog"
import userEvent from '@testing-library/user-event'; // Lisää tämä

test("render title,", () =>{
    const blog = {
        title: "Moi"
    }

    render(<Blog blog={blog}/>)

    const element = screen.getByText('Moi')
    expect(element).toBeDefined()
})

test("render blog details when 'view' button is clicked", async () => {
    const blog = {
      title: "Moi",
      author: "Matti",
      url: "https://example.com",
      likes: 5,

      user: {
        username: "testuser",
        name: "Test User"
      }

    }
  
    const user = {
      username: "testuser"
    }
  
    render(<Blog blog={blog} user={user} />)
  
    // Ensimmäisenä näkyy blogiotsikko ja tekijä
    expect(screen.getByText('Moi Matti')).toBeDefined()

    // fireEvent.click(screen.getByText('view'))

    // Painetaan 'view' nappia käyttäen userEvent
    const button = screen.getByText('view');
    await userEvent.click(button); // Huomaa "await"
    
    // Nyt URL ja likejen määrä näkyvät
    expect(screen.getByText('https://example.com')).toBeDefined()
    expect(screen.getByText('likes 5')).toBeDefined()
  })

//Tee testi, joka varmistaa että myös url,
//likejen määrä ja käyttäjä näytetään, kun blogin kaikki tiedot näyttävää nappia on painettu.
