const enzyme = require('enzyme');
const bcrypt = require('./bcryptjs');

describe('Bcrypt module: ', () => {
   it('Bcrypt password 123456 and compare the hash', async () => {
        const hashedPassword = await bcrypt.hashPassword('123456')
        const compareResult = await bcrypt.checkPassword('123456',hashedPassword)
        expect(compareResult).toEqual(true); 
   }); 

   it('Bcrypt password abcd and compare the hash', async () => {
      const hashedPassword = await bcrypt.hashPassword('abcd')
      const compareResult = await bcrypt.checkPassword('abcde',hashedPassword)
      expect(compareResult).toEqual(false); 
   }); 
});