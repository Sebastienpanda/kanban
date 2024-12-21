import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'labels'

  async up() {
    await this.raw('create extension IF NOT EXISTS "uuid-ossp" schema pg_catalog version "1.1";')

    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid('id', { primaryKey: true })
        .defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

      table.string('name').notNullable()

      table.string('color').notNullable()

      table.uuid('user_id').references('id').inTable('users').notNullable()

      table.timestamp('created_at').notNullable()
      table.uuid('created_by').notNullable().references('id').inTable('users')

      table.timestamp('updated_at').nullable()
      table.uuid('updated_by').nullable().references('id').inTable('users')

      table.timestamp('deleted_at').nullable()
      table.uuid('deleted_by').nullable().references('id').inTable('users')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
    this.schema.raw('DROP EXTENSION IF EXISTS "uuid-ossp"')
  }
}
