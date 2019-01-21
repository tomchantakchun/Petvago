
exports.up = function(knex, Promise) {
    return knex.schema.table('booking',(table)=>{
        table.dropColumn('expiryTime');
      }).table('booking',(table)=>{
        table.datetime('expiryTime');
      })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.table('booking',(table)=>{
        table.dropColumn('expiryTime');
      })
};
