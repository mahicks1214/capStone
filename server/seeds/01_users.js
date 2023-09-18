/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const {faker} = require('@faker-js/faker');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("users_table").del();
  const users = [];

  for (let i = 1; i <= 20; i++) {
    users.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      userName: faker.internet.userName(),
      rank: faker.person.jobTitle(),
      passWord: faker.internet.passWord({length: 12}),
      isAdmin: faker.datatype.boolean(),      
    });
}
await knex("users_table").insert(users);

}
