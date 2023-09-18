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
      roomName: faker.random.name(),
      roomNumber: faker.datatype.number({ min: 1, max: 10 }),
      buildingName: faker.random.name(),
      buildingNumber: faker.datatype.number({ min: 1, max: 100 }),
      equipment: faker.random.arrayElement(["Conference table", "Workstations and WiFi", "Chairs and projector"]),
      seating: faker.datatype.boolean(),
      classification: faker.random.arrayElement(["Confidential", "Unclassified", "Secret", "Top Secret"]),
      netWork: faker.random.arrayElement(["NIPR", "SIPR", "JWICS", "Commercial", "NATO"]),
      isTrainer: faker.datatype.boolean(),
    });
  } 

  await knex("spaces_table").insert(spaces);
};