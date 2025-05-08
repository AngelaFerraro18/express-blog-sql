//importo l'array di oggetti che è stato fornito
const posts = require('../data/posts.js');

//index
function index(req, res) {
    // pluto.get(); ---> aggiunto per testare l'errore in postman
    //la lista dei post sarà inizialmente uguale all'originale fornita
    let filteredPost = posts;

    //filtro per vedere se il tag è presente
    if (req.query.tag) {

        filteredPost = posts.filter(post => post.tags.includes(req.query.tag));
    }
    console.log(filteredPost);
    //mando in risposta gli elementi risultanti della ricerca
    res.json(filteredPost);
}

//show
function show(req, res) {
    let id = parseInt(req.params.id);
    let currentPost = posts.find(post => id === post.id);

    //verifico se l'elemento esiste o meno
    if (!currentPost) {

        //imposto lo status con il codice 404 
        res.status(404);

        return res.json({
            status: '404',
            error: 'Not Found',
            message: 'Post non trovato'
        })
    }
    res.json(currentPost);
}

//store
function store(req, res) {
    console.log(req.body);

    //creo un nuovo id per l'oggetto (post) che andrò a creare
    const newId = posts[posts.length - 1].id + 1;

    //creo il nuovo oggetto con tutti gli elementi che hanno anche gli altri oggetti del mio array
    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }

    //con il metodo push vado ad inserire il nuovo post nel mio array di partenza
    posts.push(newPost);

    console.log(posts);

    //inseriamo lo status corretto che in questo caso è 201 created (success)
    res.status(201);

    //restituisco il risultato (il nuovo post creato) in formato json
    res.json(newPost);
}

//update
function update(req, res) {

    let id = parseInt(req.params.id);
    let currentPost = posts.find(post => id === post.id);

    //verifico se l'elemento esiste o meno
    if (!currentPost) {

        //imposto lo status con il codice 404 
        res.status(404);

        return res.json({
            status: '404',
            error: 'Not Found',
            message: 'Post non trovato'
        })
    }

    //aggiorno tutti i dati del post
    currentPost.title = req.body.title;
    currentPost.content = req.body.content;
    currentPost.image = req.body.image;
    currentPost.tags = req.body.tags;

    console.log(currentPost);

    //restituisco il post modificato interamente in json
    res.json(currentPost);
}

//modify
function modify(req, res) {
    let id = parseInt(req.params.id);
    let currentPost = posts.find(post => id === post.id);

    //verifico se l'elemento esiste o meno
    if (!currentPost) {

        //imposto lo status con il codice 404 
        res.status(404);

        return res.json({
            status: '404',
            error: 'Not Found',
            message: 'Post non trovato'
        })
    }

    //aggiorno alcuni dati del post
    if(currentPost.title){
        currentPost.title = req.body.title; 
    }

    if(currentPost.content){
        currentPost.content = req.body.content;
    }

    if(currentPost.image){
        currentPost.image = req.body.image;
    }
   
    console.log(currentPost);

    //restituisco il post modificato nelle parti che ho scelto in json
    res.json(currentPost);
}

//destroy
function destroy(req, res) {
    let id = parseInt(req.params.id);
    let currentPost = posts.find(post => id === post.id);

    //verifico se l'elemento esiste o meno
    if (!currentPost) {

        //imposto lo status con il codice 404 
        res.status(404);

        return res.json({
            status: '404',
            error: 'Not Found',
            message: 'Post non trovato'
        })
    }

    //uso il metodo degli array splice
    posts.splice(posts.indexOf(currentPost), 1);
    //stampo in console l'array aggiornato
    console.log(posts);

    //mando come risposta lo stato "204 no Content"
    res.sendStatus(204);
}


//esporto
module.exports = { index, show, store, update, modify, destroy };