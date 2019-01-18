
exports.up = function(knex, Promise) {
    return knex.schema.table('roomType',(table)=>{
        table.integer('quantity');
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('roomType',(table)=>{
        table.dropColumn('quantity');
      })
};
