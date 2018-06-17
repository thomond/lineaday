const express = require('express')
const axios = require('axios')

const app = express()

app.get('/hourly-check', (req, res) => {
  axios.get('https://us-central1-lineaday-11542.cloudfunctions.net/sendNotifications')
    .then(() => {
      res.end()
    })
    .catch((err) => {
      res.status(500).send(err)
    })
})

// Start the server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
});
