
exports.up = function(knex, Promise) {
    return knex.schema.table('booking',(table)=>{
        table.string('ownerName');
        table.integer('ownerPhone');
        table.string('petName');
        table.decimal('petWeight');
        table.enu('petType',['dog','cat']);
        table.json('vaccineRequirement');

      })

};

exports.down = function(knex, Promise) {
    return knex.schema.table('booking',(table)=>{
        table.dropColumn('ownerName');
        table.dropColumn('ownerPhone');
        table.dropColumn('petName');
        table.dropColumn('petWeight');
        table.dropColumn('petType');
        table.dropColumn('vaccineRequirement');
      })
};
