import User from '#models/user'
import { AuthService } from '#services/auth_service'
import { Authenticator } from '@adonisjs/auth'
import { Authenticators } from '@adonisjs/auth/types'
import { inject } from '@adonisjs/core'
import { UserSchema } from '../../types/user.js'

@inject()
export class UserRepository {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }
  async createUser(data: UserSchema): Promise<User> {
    const user = await User.create({
      email: data.email,
      password: data.password,
      pseudo: data.pseudo,
    })

    return user
  }

  async login(email: string, password: string, auth: Authenticator<Authenticators>): Promise<User> {
    const user = await User.verifyCredentials(email, password)

    await this.authService.loginUserSession(user, auth)

    return user
  }
}
