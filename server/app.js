require('dotenv').config();

const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.HTTP_PORT || 3000

const client_id = process.env.clientId
const client_secret = process.env.clientSecret

app.get('/', async (req, res) => {
    try {
      const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'post',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: { 'grant_type': 'client_credentials' }
      };
  
      const response = await axios.post(authOptions.url, authOptions.data, { headers: authOptions.headers });
      console.log(response.data);
  
    } catch (error) {
      console.error(error);
    }
});
  

app.listen(port, () => {
    console.log('server started on port:' + port)
})
