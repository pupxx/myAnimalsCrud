var express = require('express');
var router = express.Router();
var knex = require('../db/connection')


//Get All
router.get('/', (req, res)=>{
  knex('animals').then((allAnimals)=>{
    console.log(allAnimals);
    res.render('animals', {
      allAnimals
    });
  });
});


router.get('/available', (req, res)=>{
  knex('animals').where('is_adopted', true).then((adopted)=>{
    res.render('animals/available', {
      adopted
    })
  })
})

//Create one
router.post('/', (req, res)=>{
  var newAnim = {
    img_url: req.body.img_url,
    name: req.body.name,
    kind: req.body.kind,
    age: req.body.age,
    is_adopted: req.body.is_adopted
  };
  knex('animals').insert(newAnim, '*').then((newAnimal)=>{
    let id = newAnimal[0].id;
    res.redirect(`/animals/${id}`);
  });
});


//go to edit page
router.get('/:id/edit', (req, res)=>{
  id = req.params.id;
  knex('animals').where('id', id).first().then((animal)=>{
    res.render('animals/edit', {
      animal
    })

  })
})

router.get('/new', (req, res)=>{
  res.render('animals/new');
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
  });
});



//Edit one
router.put('/:id', (req, res)=>{
  id = req.params.id;
  var newAnim = {
    img_url: req.body.img_url,
    name: req.body.name,
    kind: req.body.kind,
    age: req.body.age,
    is_adopted: req.body.is_adopted
  };
  knex('animals').update(newAnim, '*').where('id', id).then((newAnimal)=>{
    let id = newAnimal[0].id;
    res.redirect(`/animals/${id}`);
  });
});


module.exports = router;
