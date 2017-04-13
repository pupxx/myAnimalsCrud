var express = require('express');
var router = express.Router();
var knex = require('../db/connection')


//Get All
router.get('/', (req, res)=>{
  knex('animals').then((allAnimals)=>{
    res.render('animals', {
      allAnimals
    });
  });
});

//Get one
router.get('/:id', (req, res)=>{
  id = req.params.id;
  knex('animals').where('id', id).first().then((animal)=>{
    res.render('animals/show', {
      animal
    });
  });
});

router.delete('/:id', (req, res)=>{
  id = req.params.id;
  knex('animals').del().where('id', id).then(()=>{
    res.redirect('/animals')
  })
})

module.exports = router;
