import Usuario from '#models/usuario'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class UsuariosController {

    public async get({response}: HttpContext) {
        const page: number = 1
        const per_page: number = 25
        
        try{
            const usuarios = await Usuario.query().where('ativo', true).paginate(page, per_page)
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

            await Usuario.create({nome: body.nome,
                                            email: body.email,
                                            id_mensalidade: body.id_mensalidade,
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

            user.ativo = false
            user.deletedAt = DateTime.now()
            await user.save()

            return response.status(204)
        } catch(error) {
            return response.internalServerError({message: 'Erro ao cadastrar usuários', error})
        }
    }
}