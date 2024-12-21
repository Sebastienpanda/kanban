import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('label_id')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.uuid('label_id').references('id').inTable('users').notNullable()
    })
  }
}
