//creo una funzione per gestire l'errore 404 not Found
function notFound (req, res, next){
    res.status(404).json({
        status: 404,
        error: "Not Found",
        message: "Mi dispiace, risorsa non trovata"
    });
}

//esporto
module.exports = notFound;