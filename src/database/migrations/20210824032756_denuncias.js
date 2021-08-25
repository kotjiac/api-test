exports.up = function(knex) {
  return knex.schema.createTable('denuncias', function (table) {
      table.bigincrements('id').notNullable().primary();
      table.string('titulo', 150).notNullable();
      table.string('descricao', 255).notNullable();
      table.string('denunciante_nome', 150).notNullable();
      table.string('denunciante_cpf', 150).notNullable();
      table.double("latitude", 10, 15).notNullable();
      table.double("longitude", 11, 15).notNullable();
      table.string('logradouro', 150).nullable();
      table.string('bairro', 150).nullable();
      table.string('cidade', 150).notNullable();
      table.string('estado', 150).notNullable();
      table.string('pais', 150).notNullable();
      table.string('cep', 150).nullable();
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('denuncias');  
};