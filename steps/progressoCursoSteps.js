const { When, Then } = require('@cucumber/cucumber');

When('o usuário acessar o curso {string} pela opção {string}', async function (nomeCurso, formaAcesso) {
  await this.cursoPage.acessarCursoParaProgresso(nomeCurso, formaAcesso);
});

When('o usuário iniciar o conteúdo da aula', async function () {
  await this.cursoPage.iniciarReproducaoAula();
});

When('o usuário abrir a aula {string} para verificar o progresso', async function (nomeAula) {
  await this.cursoPage.abrirAulaParaProgresso(nomeAula);
});

Then('o progresso da aula deve ser {string}', async function (progressoEsperado) {
  await this.cursoPage.validarProgressoAula(progressoEsperado);
});

When('o usuário voltar da aula pelo navegador', async function () {
  await this.cursoPage.voltarPeloNavegador();
});

When('o usuário retornar ao catálogo e acessar novamente o curso {string} pela opção {string}', async function (nomeCurso, formaAcesso) {
  await this.cursoPage.acessarCatalogoCursos();
  await this.cursoPage.acessarCursoParaProgresso(nomeCurso, formaAcesso);
});

Then('o progresso da aula deve continuar em {string}', async function (progressoEsperado) {
  await this.cursoPage.validarProgressoAula(progressoEsperado);
});
