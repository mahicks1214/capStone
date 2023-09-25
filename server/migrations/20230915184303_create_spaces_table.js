/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('spaces_table', table => {
        table.increments('id').primary;
        table.string('roomName', 256).notNullable();
        table.string('roomNumber',256).notNullable();
        table.string('buildingName', 256);
        table.string('buildingNumber',256).notNullable();
        table.string('equipment', 256).notNullable();
        table.integer('seating', 6).notNullable();
        table.string('classification', 256).notNullable();
        table.string('network', 256).notNullable();
        table.boolean('isTrainer').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('spaces_table')
};
