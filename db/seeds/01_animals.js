exports.seed = function(knex) {
  return knex('animals').del()
    .then(() => {
      return knex('animals').insert([{
        img_url: 'http://r.ddmcdn.com/w_830/s_f/o_1/cx_98/cy_0/cw_640/ch_360/APL/uploads/2015/07/cecil-AP463227356214-1000x400.jpg',
        name: 'Leo',
        kind: 'Cat',
        age: 7,
        description: 'Cute adorable house cat.  Does not get along with other animals',
        is_adopted: false,
        created_at: new Date(),
        updated_at: new Date()
      },{
        img_url: 'https://s-media-cache-ak0.pinimg.com/originals/b2/1e/c9/b21ec91754d33bb5de86c67c45482e12--cute-bunny-bunny-bunny.jpg',
        name: 'Thumper',
        kind: 'Bunny',
        age: 3,
        description: 'Cute rabbit',
        is_adopted: false,
        created_at: new Date(),
        updated_at: new Date()
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('animals_id_seq', (SELECT MAX(id) FROM animals));"
      );
    });
};
