/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const {faker} = require('@faker-js/faker');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("01_users").del();
  const users = [];

  for (let i = 1; i <= 20; i++) {
    users.push({
      firstName: faker.firstName(),
      lastName: faker.lastName(),
      email: faker.email(),
      userName: faker.userName(),
      rank: faker.rank(),
      passWord: faker.random.passWord(),
      isAdmin: faker.datatype.boolean(),      
    });
}
  await knex("01_users").insert(users);

}
