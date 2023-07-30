import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('post_votes', (table) => {
    table.uuid('id').primary()
    table.uuid('user_id').notNullable().index().references('id').inTable('users').onDelete('CASCADE')
    table.uuid('post_id').notNullable().index().references('id').inTable('posts').onDelete('CASCADE')
    table.dateTime('created_at').notNullable()
    table.dateTime('updated_at').notNullable()
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('post_votes')
}

