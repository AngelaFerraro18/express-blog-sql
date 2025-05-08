//importo connection
const connection = require('../data/db.js');

//index
function index(req, res) {

    //salvo in una variabile la query per poter visualizzare i blog
    const sqlBlog = `SELECT * FROM posts`;

    //vado ad eseguire la query grazie a connection
    connection.query(sqlBlog, (err, results) => {
        if (err) return res.status(500).json({ error: 'Posts non trovati!' });
        res.json(results);
    })

}

//show
function show(req, res) {
    let id = parseInt(req.params.id);

    //salvo in una variabile la query per poter visualizzare un blog
    const sqlBlogShow = `SELECT * FROM posts WHERE id= ?`;

    connection.query(sqlBlogShow, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Ricerca del post fallita!' });
        if (results.length === 0) return res.status(404).json({ error: 'Post non trovato!' });
        res.json(results[0]);
    })
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
    if (currentPost.title) {
        currentPost.title = req.body.title;
    }

    if (currentPost.content) {
        currentPost.content = req.body.content;
    }

    if (currentPost.image) {
        currentPost.image = req.body.image;
    }

    console.log(currentPost);

    //restituisco il post modificato nelle parti che ho scelto in json
    res.json(currentPost);
}

//destroy
function destroy(req, res) {
    let id = parseInt(req.params.id);

    //salvo in una variabile la quey per cancellare un post
    const sqlBlogDelete = `DELETE FROM posts WHERE id= ?`;

    //eseguo l'eliminazione del post
    connection.query(sqlBlogDelete, [id], (err) => {
        if (err) return res.status(500).json({ error: `Errore nell'eliminazione del post!` });
        res.sendStatus(204);
    });
}


//esporto
module.exports = { index, show, store, update, modify, destroy };