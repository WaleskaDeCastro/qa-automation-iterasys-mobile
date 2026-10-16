const { When, Then } = require('@cucumber/cucumber');

Then('o módulo {string} e a aula {string} devem estar disponíveis', async function (modulo, nomeAula) {
  await this.cursoPage.validarModuloEAula(modulo, nomeAula);
});

When('o usuário iniciar ou continuar o curso pela opção {int}', async function (indiceBotao) {
  await this.cursoPage.continuarCurso(indiceBotao);
});

When('o usuário iniciar a reprodução da aula', async function () {
  await this.cursoPage.iniciarReproducaoAula();
});

Then('o player da aula deve carregar corretamente', async function () {
  await this.cursoPage.validarPlayerCarregado();
});

Then('a aula deve estar em reprodução', async function () {
  await this.cursoPage.validarReproducaoAula();
});

When('o usuário pausar a aula', async function () {
  await this.cursoPage.pausarReproducaoAula();
});

Then('a aula deve estar pausada', async function () {
  await this.cursoPage.validarAulaPausada();
});

When('o usuário retomar a aula', async function () {
  await this.cursoPage.retomarReproducaoAula();
});

Then('o player deve permitir avançar e recuar quando disponível', async function () {
  const controleDisponivel = await this.cursoPage.validarAvancoERecuoAula();
  if (!controleDisponivel) {
    await this.attach('O controle de avanço/recuo não está disponível nesta aula.', 'text/plain');
  }
});

When('o usuário recarregar a página da aula', async function () {
  await this.cursoPage.recarregarAula();
});
