import Usuario from '#models/usuario'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class UsuariosController {

    public async get({response, request}: HttpContext) {
        const {pagination, filter, inativos} = request.qs()
        const defaultPagination = pagination.page ?? 1
        const defaultLimit = pagination.rowsPerPage ?? 25
        const defaultFilter = filter ?? ''
        const inativosDefault = inativos==='true'? true : false
        
        try{
            const usuarios = await Usuario.query().preload('mensalidade')
                .if(defaultFilter, (query) => {query.whereILike('nome', `%${defaultFilter}%`)})
                .if(inativosDefault, 
                    (query) => {
                        query.where('ativo', false)},
                    (query) => {
                        query.where('ativo', true)})
                .paginate(defaultPagination, defaultLimit)
            return response.ok(usuarios)
        } catch(error) {
            return response.internalServerError({message: 'Erro ao buscar usuários', error})
        }
    }

    public async create({response, request}: HttpContext){
        try{
            const body = request.body()
            
            if(!body.cpf || !body.nome){
                return response.badRequest('Dados inválidos para cadastro')
            }

            const user = await Usuario.query().where('cpf', body.cpf).first()
            
            if(user){
                return response.badRequest('Já existe um usuário cadastrado com esse cpf')
            }

            await Usuario.create({nome: body.nome,
                                            email: body.email,
                                            id_mensalidade: body.mensalidade,
                                            cpf: body.cpf,
                                            telefone: body.telefone})
            
            return response.status(201)

        } catch(error) {
            return response.internalServerError({message: 'Erro ao cadastrar usuário', error})
        }
    }


    // Considerando que um usuário pode alterar seu email e telefone, mas não seu nome e cpf
    public async update({params, response, request}: HttpContext){
        try{
            const body = request.body()
            const user = await Usuario.findOrFail(params.id)

            if(!user){
                return response.badRequest('Usuário não encontrado')
            }

            user.email = body.email
            user.telefone = body.telefone
            user.id_mensalidade = body.mensalidade
            await user.save()

            return response.status(204)

        } catch(error) {
            return response.internalServerError({message: 'Erro ao atualizar usuários', error})
        }
    }

    public async delete({params, response}: HttpContext){
        try{
            const user = await Usuario.findOrFail(params.id)

            if(!user){
                return response.badRequest('Usuário não encontrado')
            }

            if(user.ativo){
                user.ativo = false
                user.deletedAt = DateTime.now()
                await user.save()
            } else {
                user.ativo = true
                user.deletedAt = null
                await user.save()
            }

            return response.status(204)
        } catch(error) {
            return response.internalServerError({message: 'Erro ao cadastrar usuários', error})
        }
    }
}