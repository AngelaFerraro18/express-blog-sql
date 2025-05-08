//importo express
const express = require('express');
//importo routers
const postsRouters = require('./routers/postsRouters.js');
//importo errorsHandler
const errorsHandler = require('./middleware/errorsHandler.js');
//importo notFound
const notFound = require('./middleware/notFound.js');
const app = express();
const port = 3000;

//decodifico con il body-parser
app.use(express.json());

//bacheca con i post
app.use('/posts', postsRouters);

//imposto il middleware errors
app.use(errorsHandler);

//imposto il middleware per l'errore 404
app.use(notFound);

app.listen(port, () => {
    console.log(`Il server è in ascolto alla porta: ${port}.`);
})