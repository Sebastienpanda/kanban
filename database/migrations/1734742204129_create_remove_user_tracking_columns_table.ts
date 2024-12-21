import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('created_by')
      table.dropColumn('updated_by')
      table.dropColumn('deleted_by')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.uuid('created_by').references('id').inTable('users').notNullable()
      table.uuid('updated_by').references('id').inTable('users').nullable()
      table.uuid('deleted_by').references('id').inTable('users').nullable()
    })
  }
}
