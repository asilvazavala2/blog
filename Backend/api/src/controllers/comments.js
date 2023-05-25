const { Router } = require('express');
const router = Router();
const { Comments } = require('../db');

// Obtener todos las comentarios || Buscar comentario
router.get('/', async (req, res) => {  
  const allComments = await Comments.findAll()
  const text = req.query.text;

  if (text) {
    const findComment = await allComments.filter(
      pub => pub.text.toLowerCase().includes(text.toLowerCase()));
      
    findComment.length > 0 
    ? res.send(findComment) 
    : res.status(404).send(`No existe ningún comentario con "${text}" intenta con otro nombre`);
  } else {
      res.send(allComments);
    }
});


// Crear una comentario
router.post('/', async (req, res) => {
  // Nueva info pasada por el usuario
  let { text, createdInDB } = req.body;
  
  if (text.length > 10) {
    await Comments.create({ text, createdInDB })
    res.send('Comentario creado con éxito');
  } else {
      res.status(404).send('El comentario debe tener al menos 10 carácteres')
    }
});


// Eliminar una comentario
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const findId = await Comments.findByPk(id)
  if (findId) {
    await Comments.destroy({ where : {id : id} })
    res.send('Comentario eliminado correctamente!!');
  } else {
      res.status(400).send(`Comnetario con ID ${id} no encontrado`)
    }
});


// Actualizar una comentario
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const findId = await Comments.findByPk(id)
  if (!findId) {
    res.status(400).send(`Comnetario con ID ${id} no encontrado`)
  } else {
    await Comments.update ({ text }, { where : { id } },); 
    res.send('Comentario modificado correctamente!!');
    }
});

module.exports = router;