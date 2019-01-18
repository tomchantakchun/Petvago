
exports.up = function(knex, Promise) {
    return knex.schema.table('booking',(table)=>{
        table.date('orderDate');
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('booking',(table)=>{
        table.dropColumn('orderDate');
      })

  
};
