import Task from '#models/task'
import { AuthService } from '#services/auth_service'
import { Authenticator } from '@adonisjs/auth'
import { Authenticators } from '@adonisjs/auth/types'
import { inject } from '@adonisjs/core'
import { TaskSchema } from '../../types/task.js'

@inject()
export class TaskRepository {
  constructor(private authService: AuthService) {}

  async create(data: TaskSchema, auth: Authenticator<Authenticators>): Promise<Task> {
    const user = await this.authService.getAuthenticatedUser(auth)

    const task = await Task.create({
      title: data.title,
      description: data.description,
      createdBy: user.id,
    })

    return task
  }
}
