
exports.up = function(knex, Promise) {
    return knex.schema.table('hotel',(table)=>{
        table.integer('peopleRated');
        
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('hotel',(table)=>{
        table.dropColumn('peopleRated');
        
      })
};
