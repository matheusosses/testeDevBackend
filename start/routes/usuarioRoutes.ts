import router from '@adonisjs/core/services/router'

router.group(() => {

    router.get('/', '#controllers/usuarios_controller.get')
    router.post('/', '#controllers/usuarios_controller.create')
    router.put('/:id', '#controllers/usuarios_controller.update')
    router.delete('/:id', '#controllers/usuarios_controller.delete')
        

}).prefix('/usuarios')