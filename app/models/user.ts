import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { UserRole } from '../enums/user_role.js'
import Label from './label.js'
import Task from './task.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare pseudo: string

  @column()
  declare avatar?: string

  @column({
    consume: (value: string) => value as UserRole,
    prepare: (value: UserRole) => value,
  })
  declare role: UserRole

  @column()
  declare isActive: boolean

  @hasMany(() => Label)
  declare labels: HasMany<typeof Label>

  @hasMany(() => Task, {
    foreignKey: 'createdById',
  })
  declare tasks: HasMany<typeof Task>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column.dateTime()
  declare deletedAt: DateTime | null
}
