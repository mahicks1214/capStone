/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const {faker} = require('@faker-js/faker'); 


exports.seed = async function(knex) { 
  // Deletes ALL existing entries
  await knex("spaces_table").del();
  const spaces = [];

  for (let i = 1; i <= 20; i++) {
    spaces.push({
      roomName: faker.person.zodiacSign(),
      roomNumber: faker.location.buildingNumber(),
      buildingName: faker.animal.bird(),
      buildingNumber: faker.location.buildingNumber(),
      equipment: faker.helpers.arrayElement(["Conference table", "Workstations and WiFi", "Chairs and projector"]),
      seating: faker.number.int({min:5, max:100}),
      classification: faker.helpers.arrayElement(["Confidential", "Unclassified", "Secret", "Top Secret"]),
      network: faker.helpers.arrayElement(["NIPR", "SIPR", "JWICS", "Commercial", "NATO"]),
      isTrainer: faker.datatype.boolean(),
    });
  } 

  await knex("spaces_table").insert(spaces);
};