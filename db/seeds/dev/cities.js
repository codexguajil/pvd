exports.seed = function(knex, Promise) {
  
  return knex('addresses').del() 
    .then(() => knex('cities').del()) 

    .then(() => {
      return Promise.all([
        
        knex('cities').insert({
          city: 'Fort Worth', avg_pvw: 109
        }, 'id')
        .then(city => {
          return knex('addresses').insert([
            { address: '123 fake st', pvw: '108', city_id: city[0] }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
