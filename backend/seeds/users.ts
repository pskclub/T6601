import {Knex} from 'knex';

export async function seed(knex: Knex): Promise<void> {
  const user = await knex.select().table('users').first();
  if (user) {
    return;
  }

  await knex('users').insert([
    {
      id: 'fbe619be-1caa-4e71-a5e6-c56a7a8f80e3',
      username: 'pskclub',
      // password_hash: '12345678',
      password: 'pbkdf2_sha256$180000$OtVGOV/gY6w=$KWBJM+Noe1BOTgg5uubXbKqw8Y3nnOo1iRAUcJVzP7o=',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '27d24c10-44b3-43f7-849b-24ca03bcd3cc',
      username: 'long',
      // password_hash: '12345678',
      password: 'pbkdf2_sha256$180000$CMswQmquJDs=$pqAdpr8dBgpbvyuRHAa8rtPZ9fScQOtweUz2i30lO/U=',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};
