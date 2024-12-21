/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const TestsController = () => import('#controllers/tests_controller')
const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
router.on('/').renderInertia('home')

router.post('/test', [TestsController, 'createTest'])

router
  .group(() => {
    router.post('/register', [AuthController, 'register'])
    router.post('/login', [AuthController, 'login'])
  })
  .prefix('/api')

router
  .group(() => {
    router.get('/me', [UsersController, 'me'])
  })
  .prefix('/api')
  .use(
    middleware.auth({
      guards: ['web'],
    })
  )
