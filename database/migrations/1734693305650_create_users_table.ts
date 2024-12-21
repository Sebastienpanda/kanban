import { BaseSchema } from '@adonisjs/lucid/schema'
import { UserRole } from '../../app/enums/user_role.js'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    await this.raw('create extension IF NOT EXISTS "uuid-ossp" schema pg_catalog version "1.1";')

    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid('id', { primaryKey: true })
        .defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()

      table.string('pseudo', 50).notNullable()

      table.string('avatar', 255).nullable()

      table.enum('role', Object.values(UserRole)).defaultTo(UserRole.USER).notNullable()

      table.boolean('is_active').defaultTo(false).notNullable()

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
