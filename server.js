const express = require('express');
const server = express();
const port = 3000;
server.set('view engine', 'ejs');
server.use(express.static('./public'));
server.get('/*', (req, res) => {
    res.render('index');
})


server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
