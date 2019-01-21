const enzyme = require('enzyme');
const bcypt = require('./bcrypt');

describe('Bcrypt module: ', () => {
   it('Bcrypt password 123456 and compare the hash', async () => {
        const hashedPassword = await bcypt.hashPassword('123456')
        const compareResult = await bcypt.checkPassword('123456',hashedPassword)
        expect(compareResult).toEqual(true); 
   }); 
});