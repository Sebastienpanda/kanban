import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import User from './user.js'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare position: number | null

  @column()
  declare priority: string | null

  @column()
  declare isArchived: boolean

  @column({ columnName: 'assigned_to' })
  declare assignedTo: string

  @belongsTo(() => User, {
    foreignKey: 'assigned_to',
  })
  declare assignee: BelongsTo<typeof User>

  @column({ columnName: 'created_by' })
  declare createdBy: string

  @belongsTo(() => User, {
    foreignKey: 'created_by',
  })
  declare creator: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column({ columnName: 'updated_by' })
  declare updatedBy: string

  @belongsTo(() => User, {
    foreignKey: 'updated_by',
  })
  declare updater: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column({ columnName: 'deleted_by' })
  declare deletedBy: string

  @belongsTo(() => User, {
    foreignKey: 'deleted_by',
  })
  declare deleter: BelongsTo<typeof User>
}
