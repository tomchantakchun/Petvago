
exports.up = function(knex, Promise) {
    return knex.schema.table('roomtype',(table)=>{
        table.integer('quantity');
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('roomtype',(table)=>{
        table.dropColumn('quantity');
      })
};
