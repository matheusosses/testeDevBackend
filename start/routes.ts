/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import './routes/mensalidadeRoutes.js'
import './routes/usuarioRoutes.js'

router.group(() => {

  router.get('/', async () => {
    return {
      hello: 'world',
    }
  })


}).prefix('/api')


