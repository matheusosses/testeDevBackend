import Mensalidade from '#models/mensalidade'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class MensalidadesController {
    
    public async get({response, request}: HttpContext) {
        const {page, rowsPerPage} = request.qs()
        const defaultPagination = page ?? 1
        const defaultLimit = rowsPerPage ?? 25
        try{
            const mensalidade = await Mensalidade.query().whereNull('deleted_at').paginate(defaultPagination, defaultLimit)
            return response.ok(mensalidade)
        } catch(error) {
             return response.internalServerError({message: 'Erro ao buscar mensalidades', error})
        }
    }

    public async list({response, request}: HttpContext) {
        try {
            const mensalidade = await Mensalidade.query().if(request.input('filter'), (query) => {query.whereILike('descricao', request.input('filter'))}).whereNull('deleted_at').limit(10)
            return response.ok(mensalidade)
        } catch (error) {
           return response.internalServerError({message: 'Erro ao buscar mensalidades', error}) 
        }
    }

    public async create({response, request}: HttpContext){
        try{
            const body = request.body()
            console.log(body)
            
            if(!body.descricao || !body.valor || !body.dataValidade){
                return response.badRequest('Dados inválidos para cadastro')
            }

            await Mensalidade.create({descricao: body.descricao,
                                            data_validade: body.dataValidade,
                                            valor: body.valor})
            
            return response.status(201)

        } catch(error) {
            return response.internalServerError({message: 'Erro ao cadastrar mensalidade', error})
        }
    }

    // Para a mensalidade, é permitido alterar apenas o valor e a data de validade.
    public async update({params, response, request}: HttpContext){
        try{
            const body = request.body()
            const mensalidade = await Mensalidade.findOrFail(params.id)

            if(!mensalidade){
                return response.badRequest('Mensalidade não encontrado')
            }

            mensalidade.valor = body.valor
            mensalidade.data_validade = body.dataValidade
            await mensalidade.save()

            return response.status(204)

        } catch(error) {
            return response.internalServerError({message: 'Erro ao atualizar a mensalidade', error})
        }
    }

    public async delete({params, response}: HttpContext){
        try{
            const mensalidade = await Mensalidade.findOrFail(params.id)

            if(!mensalidade){
                return response.badRequest('Mensalidade não encontrado')
            }
            mensalidade.deletedAt = DateTime.now()
            await mensalidade.save()

            return response.status(204)
        } catch(error) {
            return response.internalServerError({message: 'Erro ao mensalidade usuários', error})
        }
    }
}