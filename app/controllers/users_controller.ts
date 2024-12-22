import { AuthService } from '#services/auth_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
  constructor(private authService: AuthService) {}

  async me({ response, auth }: HttpContext) {
    try {
      const user = await this.authService.getAuthenticatedUser(auth)

      await user.load('labels')

      await user.load('tasks')

      return response.ok(user)
    } catch (error) {
      console.log(error)
      return response.badRequest(error)
    }
  }
}
