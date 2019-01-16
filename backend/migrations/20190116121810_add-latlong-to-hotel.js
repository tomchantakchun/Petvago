
exports.up = function(knex, Promise) {
    return knex.schema.table('hotel',(table)=>{
        table.float('latitude');
        table.float('longitude');
        table.enu('district',['Central and Western','Eastern','Islands','Kowloon City','Kwai Tsing','Kwun Tong','North','Sai Kung','Sha Tin','Sham Shui Po','Southern','Tai Po','Tsuen Wan','Tuen Mun','Wan Chai','Wong Tai Sin','Yau Tsim Mong','Yuen Long']);

      }).table('message',(table)=>{
        table.dropColumn('authorID');
      }).table('message',(table)=>{
        table.json('authorID')
      })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.table('hotel',(table)=>{
        table.dropColumn('latitude');
        table.dropColumn('longitude');
        table.dropColumn('district');
      }).table('message',(table)=>{
        table.dropColumn('authorID');
      })
};
