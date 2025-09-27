import router from '@adonisjs/core/services/router'

router.group(() => {

    router.get('/', '#controllers/mensalidades_controller.get')
    router.post('/', '#controllers/mensalidades_controller.create')
    router.put('/:id', '#controllers/mensalidades_controller.update')
    router.delete('/:id', '#controllers/mensalidades_controller.delete')
    router.get('/list', '#controllers/mensalidades_controller.list') 
        

}).prefix('/mensalidades')