const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

//Koodi aloittaa etsimällä pyynnön mukana olevaa usernamea vastaavan käyttäjän tietokannasta
  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)
// Jos käyttäjää ei ole olemassa tai salasana on väärä, vastataan kyselyyn statuskoodilla 401 unauthorized
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }
// Jos salasana on oikein, luodaan metodin jwt.sign avulla token
  const userForToken = {
    username: user.username,
    id: user._id,
  }
  // token expires in 60*60 seconds, that is, in one hour
  const token = jwt.sign(
    userForToken, 
    process.env.SECRET,
    { expiresIn: 60*60 }
  )

// käyttäjän käyttäjätunnus ja nimi lähetetään vastauksen bodyssä pyynnön tekijälle.
  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter