import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('posts', (table) => {
    table.uuid('id').primary()
    table.string('name').notNullable()
    table.boolean('is_closed').notNullable()
    table.text('description').nullable()
    table.uuid('user_id').notNullable().index().references('id').inTable('users').onDelete('CASCADE')
    table.dateTime('created_at').notNullable()
    table.dateTime('updated_at').notNullable()
    table.dateTime('deleted_at')
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('posts')
}

