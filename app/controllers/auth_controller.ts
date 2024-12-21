import { UserValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { UserRepository } from '../repositories/user_repositorie.js'

@inject()
export default class AuthController {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async register({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(UserValidator)

      const user = await this.userRepository.createUser({
        email: payload.email,
        password: payload.password,
        pseudo: payload.pseudo,
      })

      return response.created(user)
    } catch (error) {
      console.log(error)
    }
  }

  async login({ request, response, auth }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])

      const user = await this.userRepository.login(email, password, auth)

      return response.ok(user)
    } catch (error) {}
  }
}
