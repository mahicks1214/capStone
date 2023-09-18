/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const {faker} = require('@faker-js/faker'); 


exports.seed = async function(knex) {
  const reservations = [];
  // Deletes ALL existing entries
  await knex("reservations_table").del();

  for (let i = 1; i <= 20; i++) {   
    reservations.push({
      userId: faker.random.number({min: 1, max:20}),
      roomId: faker.random.number({min: 1, max:20}),
      meetingName: faker.hacker.verb() + " training",
      meetingDescription: faker.company.catchPhrase(),
      attendees: faker.attendees(),
      meetingStart: faker.dateTime.between('2023-09-15T00:00:00Z', '2023-09-30T00:00:00Z'),
      meetingEnd: faker.dateTime.dateTimeOffset(meetingStart, 1),
    });
  }
  await knex("reservations_table").insert(reservations);
};