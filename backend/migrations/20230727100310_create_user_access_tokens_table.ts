import { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user_access_tokens', (table) => {
    table.uuid('id').primary()
    table.uuid('user_id').notNullable().index().references('id').inTable('users').onDelete('CASCADE')
    table.string('token').notNullable()
    table.dateTime('created_at').notNullable()
    table.dateTime('updated_at').notNullable()
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user_access_tokens')
}

