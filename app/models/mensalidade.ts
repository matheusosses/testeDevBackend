import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Mensalidade extends BaseModel {
  @column({ isPrimary: true })
  public declare id: number

  @column()
  public declare descricao: string

  @column()
  public declare valor: number

  @column.dateTime()
  public declare data_validade: DateTime

  @column.dateTime({ autoCreate: true })
  public declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public declare updatedAt: DateTime
  
  @column.dateTime()
  public declare deletedAt: DateTime
}