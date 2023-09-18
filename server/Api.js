const express = require('express'); 
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send('I love this api!!!')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))