import User from '#models/user'
import type { Authenticator } from '@adonisjs/auth'
import { Authenticators } from '@adonisjs/auth/types'

export class AuthService {
  async getAuthenticatedUser(auth: Authenticator<Authenticators>): Promise<User> {
    const user = await auth.authenticate()
    return user
  }

  async loginUserSession(user: User, auth: Authenticator<Authenticators>): Promise<void> {
    await auth.use('web').login(user)
  }

  async logoutUserSession(auth: Authenticator<Authenticators>): Promise<void> {
    await auth.use('web').logout()
  }
}
