//importo express
const express = require('express');
//importo i controllers
const postController = require('../controllers/postController.js');
const router = express.Router();

//index
router.get('/', postController.index);

//show
router.get('/:id', postController.show);

//store
router.post('/', postController.store);

//update
router.put('/:id', postController.update);

//modify
router.patch('/:id', postController.modify);

//destroy
router.delete('/:id', postController.destroy);

//esporto
module.exports = router;