import { TaskValidator } from '#validators/task'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { TaskRepository } from '../repositories/task_repositorie.js'

@inject()
export default class TasksController {
  constructor(private taskRepository: TaskRepository) {}
  async create({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(TaskValidator)

      const task = await this.taskRepository.create(
        {
          title: payload.title,
          description: payload.description,
        },
        auth
      )

      return response.created(task)
    } catch (error) {
      console.log(error)
    }
  }
}
