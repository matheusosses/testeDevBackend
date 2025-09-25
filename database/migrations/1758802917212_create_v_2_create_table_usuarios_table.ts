import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'usuarios'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_mensalidade').references('id').inTable('mensalidades')
      table.string('nome', 255)
      table.string('email', 255).unique()
      table.string('cpf', 14).unique()
      table.string('telefone', 15)
      table.boolean('ativo').defaultTo(true)


      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}