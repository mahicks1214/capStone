/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema.createTable('users_table', table => {
        table.increments('id').primary;
        table.string('firstName', 256).notNullable();
        table.string('lastName', 256).notNullable();
        table.string('userName', 256).notNullable();
        table.string('passWord', 256).notNullable();
        table.string('email', 256).notNullable();
        table.string('rank', 256).notNullable();
        table.boolean('isAdmin').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {    
        return knex.schema.dropTableIfExists('users')
};


