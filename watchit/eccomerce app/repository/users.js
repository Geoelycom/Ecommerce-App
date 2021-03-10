const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const repository = require('./repository');


const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends repository {
    async create(attr) {
        attr.id = this.randomId();
        const salt = crypto.randomBytes(8).toString('hex');
        const buffer = await scrypt(attr.password, salt, 64);

        const records = await this.getAll();
        const record = {
            ...attr,
            password: `${buffer.toString('hex')}.${salt}`
        };
        records.push(record)
        await this.writeAll(records);
        return record;
    }

    async comparePasswords(saved, supplied) {
        // saved -> password saved in our database
        // supplied -> password supplied by the user trying to sign in
        const [hashed, salt] = saved.split('.');
        const hashedSuppliedbufffer = await scrypt(supplied, salt, 64);
        return hashed === hashedSuppliedbufffer.toString('hex');
    }

}

module.exports = new UsersRepository('users.json');