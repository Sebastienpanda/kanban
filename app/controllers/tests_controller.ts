import Label from '#models/label'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { UserRole } from '../enums/user_role.js'

export default class TestsController {
  async createTest({ response }: HttpContext) {
    try {
      const admin = await User.create({
        email: 'admin@test.com',
        password: 'password123',
        pseudo: 'admin',
        role: UserRole.ADMIN,
        isActive: true,
      })

      const user = await User.create({
        email: 'user@test.com',
        password: 'password123',
        pseudo: 'user',
        role: UserRole.USER,
        isActive: true,
      })

      const label = await Label.create({
        name: 'Test Label',
        color: '#FF0000',
        userId: user.id,
        createdById: admin.id,
      })

      await label.load('user')

      return response.ok({
        label: {
          name: label.name,
          color: label.color,
          owner: {
            email: label.user.email,
            pseudo: label.user.pseudo,
            createdBy: label.user.id,
          },
          userId: user.id,
        },
        user: {
          email: user.email,
          pseudo: user.pseudo,
        },
      })
    } catch (error) {
      console.error('Test error:', error)
      return response.internalServerError({
        error: 'Test failed',
        details: error.message,
      })
    }
  }
}
