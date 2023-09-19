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

    // const dateStart = faker.date.soon();
    // const meetingHours = faker.number.int({min: 1 , max: 3})
    // const dateOffset = faker.date.future({hours: meetingHours, refDate: dateStart})

    // console.log(`dateStart: ${dateStart}`)
    // console.log(`meetingHours:${meetingHours}`)
    // console.log(`dateOffset: ${dateOffset}`)


    reservations.push({
      userId: faker.number.int({min: 1, max:20}),
      roomId: faker.number.int({min: 1, max:20}),
      meetingName: faker.hacker.verb() + " training",
      meetingDescription: faker.company.catchPhrase(),
      attendees: faker.helpers.uniqueArray(faker.definitions.person.first_name, faker.number.int({min: 2, max: 8})),
      // meetingStart: dateStart,
      // meetingEnd: dateStart + dateOffset,
      meetingStart: faker.date.soon(),
      meetingDuration: faker.number.int({min:1 , max: 8})
    });
  }
  await knex("reservations_table").insert(reservations);
};