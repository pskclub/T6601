import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary();
    table.string('username').index().unique();
    table.string('password');
    table.dateTime('created_at').notNullable();
    table.dateTime('updated_at').notNullable();
    table.dateTime('deleted_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}

