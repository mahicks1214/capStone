/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('reservations_table', table => {
        table.increments('id').primary;
        table.integer('userId').notNullable();
        table.foreign('userId').references('users_table.id');
        table.integer('roomId').notNullable();
        table.foreign('roomId').references('spaces_table.id');        
        table.string('meetingName', 256).notNullable();
        table.string('meetingDescription', 1056).notNullable();
        table.string('attendees', 1056).notNullable();
        table.dateTime('meetingStart').notNullable();        
        table.integer('meetingDuration').notNullable();
    })
};



/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) { 
    return knex.schema.alterTable('reservations_table', table => {
        table.dropForeign('userId');
        table.dropForeign('roomId');
      })
        .then(function (){
            return knex.schema.dropTableIfExists('reservations_table');
      })
};
