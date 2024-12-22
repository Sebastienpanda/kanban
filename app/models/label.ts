import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import User from './user.js'

export default class Label extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare color: string

  @column()
  declare userId: string | null

  @column({ columnName: 'created_by' })
  declare createdBy: string

  @belongsTo(() => User, {
    foreignKey: 'created_by',
  })
  declare creator: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null

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

  @column.dateTime()
  declare deletedAt: DateTime | null
}
