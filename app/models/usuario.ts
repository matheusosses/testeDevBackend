import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Mensalidade from './mensalidade.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'


export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  public declare id: number

  @column()
  public declare id_mensalidade: number | null

  @column()
  public declare nome: string

  @column()
  public declare email: string

  @column()
  public declare cpf: string

  @column()
  public declare telefone: string

  @column()
  public declare ativo: boolean

  @column.dateTime({ autoCreate: true })
  public declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public declare updatedAt: DateTime

  @column.dateTime()
  public declare deletedAt: DateTime

  @belongsTo(() => Mensalidade, {
    foreignKey: 'id_mensalidade',
  })
  public declare mensalidade: BelongsTo<typeof Mensalidade>
}