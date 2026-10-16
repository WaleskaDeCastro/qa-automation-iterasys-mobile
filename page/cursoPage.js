const { expect } = require('@playwright/test');

class CursoPage {
  constructor(page) {
    this.page = page;
    this.linkVoltar = page.locator('a.-default-course-player-back').first();
  }

  async acessarPlataforma() {
    await this.page.goto('https://iterasys.learnworlds.com/');
  }

  async irParaLogin() {
    const viewport = this.page.viewportSize();
    if (viewport && viewport.width <= 768) {
      const menuMobile = this.page.locator('.lw-topbar-hamburger-button');
      await menuMobile.waitFor({ state: 'visible' });
      await menuMobile.click();
      await this.page.locator('.mobile-nav-menu-link')
        .filter({ hasText: 'Entrar' })
        .click();
      return;
    }

    await this.page.locator(
      '[data-interactive-link-type="openformslink"][data-interactive-link-var1="signin"]'
    ).filter({ visible: true }).click();
  }

  async irParaCursos() {
    const viewport = this.page.viewportSize();
    if (viewport && viewport.width <= 768) {
      await this.page.locator('.lw-topbar-hamburger-button').click();
      const linkCursos = this.page.locator('.mobile-nav-menu-link[href="/courses"]');
      await linkCursos.waitFor({ state: 'visible' });
      await linkCursos.click();
      return;
    }

    await this.page.getByRole('link', { name: 'Cursos', exact: true }).click();
  }

  async preencherLogin(email, senha) {
    await this.page.getByRole('textbox', { name: 'Digite seu e-mail:' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Digite sua senha:' }).fill(senha);
    await this.page.getByRole('button', { name: 'Entrar' }).click();
    const meuLocator = this.page.locator(`h2[class="lw-widget-in learnworlds-subheading learnworlds-element learnworlds-subheading-large"]:has-text("Hi, Waleska de Castro Cavalcanti")`);
    
    await meuLocator.waitFor({ state: 'visible', timeout: 15000 });

  }

  async carregarMaisCursos() {
    await expect(this.page.locator('#component_1750969932641_344')).toContainText('Carregar mais');
    await this.page.getByRole('button', { name: 'Carregar mais' }).click();
  }

  async localizarLinkCurso(nomeCurso) {
    const tituloCurso = this.page.getByRole('heading', { name: nomeCurso, exact: true });
    await expect(tituloCurso).toBeVisible({ timeout: 15000 });

    const idTitulo = await tituloCurso.getAttribute('id');
    if (!idTitulo) {
      throw new Error(`O título do curso "${nomeCurso}" não possui um ID para localizar o card.`);
    }

    return this.page.locator(`a[aria-labelledby="${idTitulo}"]`).first();
  }

  async validarCursoDisponivel(nomeCurso) {
    const linkCurso = await this.localizarLinkCurso(nomeCurso);
    await expect(linkCurso).toBeVisible({ timeout: 15000 });
  }

  async continuarCurso(indiceBotao) {
    const botaoContinuar = this.page.getByRole('button', { name: 'Continue aprendendo' }).nth(indiceBotao);
    await expect(botaoContinuar).toBeVisible();
    await botaoContinuar.click();
  }

  async abrirCurso(nomeCurso) {
    const linkCurso = await this.localizarLinkCurso(nomeCurso);
    await expect(linkCurso).toBeVisible({ timeout: 15000 });
    await linkCurso.scrollIntoViewIfNeeded();
    await linkCurso.click();
  }

  async validarTituloCurso(nomeCurso) {
    await expect(this.page.getByText(nomeCurso, { exact: true }).first()).toBeVisible();
  }

  async abrirAula(nomeAula) {
    await this.page.getByText(nomeAula).click();
  }

  async validarModuloEAula(modulo, nomeAula) {
    await expect(this.page.getByText(modulo, { exact: true }).first()).toBeVisible();
    await expect(this.page.getByText(nomeAula, { exact: false }).first()).toBeVisible();
  }

  async validarAulaEOpcoesDeRetorno(nomeCurso, nomeAula) {
    await expect(this.page.locator('h1')).toContainText(nomeCurso);
    const tituloAulaVisivel = this.page.getByText(nomeAula, { exact: false })
      .filter({ visible: true })
      .first();
    await expect(tituloAulaVisivel).toBeVisible();
    await expect(this.linkVoltar).toBeVisible();
  }

  async iniciarReproducaoAula() {
    const player = this.page.frameLocator('iframe[title="Conteúdo da unidade"]');
    const video = player.locator('video').first();
    if (await video.evaluate(element => element.paused)) {
      await player.locator('.overlayState').click();
    }
  }

  async validarPlayerCarregado() {
    const player = this.page.frameLocator('iframe[title="Conteúdo da unidade"]');
    const controleReproducao = player.getByRole('slider', { name: 'Barra de reprodução' });
    const video = player.locator('video').first();

    await expect(controleReproducao).toBeVisible();
    await expect(video).toBeAttached();
    await expect.poll(
      () => video.evaluate(element => element.readyState >= 1 && Number.isFinite(element.duration) && element.duration > 0),
      { timeout: 15000 }
    ).toBe(true);
  }

  async validarReproducaoAula() {
    const video = this.page.frameLocator('iframe[title="Conteúdo da unidade"]').locator('video').first();
    await expect.poll(() => video.evaluate(element => !element.paused)).toBe(true);

    const tempoInicial = await video.evaluate(element => element.currentTime);
    await expect.poll(
      () => video.evaluate(element => element.currentTime),
      { timeout: 15000 }
    ).toBeGreaterThan(tempoInicial);
  }

  async pausarReproducaoAula() {
    const player = this.page.frameLocator('iframe[title="Conteúdo da unidade"]');
    await player.locator('.overlayState').click();
  }

  async retomarReproducaoAula() {
    await this.iniciarReproducaoAula();
  }

  async validarAulaPausada() {
    const video = this.page.frameLocator('iframe[title="Conteúdo da unidade"]').locator('video').first();
    await expect.poll(() => video.evaluate(element => element.paused)).toBe(true);
  }

  async validarAvancoERecuoAula() {
    const player = this.page.frameLocator('iframe[title="Conteúdo da unidade"]');
    const video = player.locator('video').first();
    const controleReproducao = player.getByRole('slider', { name: 'Barra de reprodução' });
    const caixaControle = await controleReproducao.boundingBox();
    const desabilitado = await controleReproducao.getAttribute('aria-disabled');

    if (!caixaControle || caixaControle.width <= 0 || desabilitado === 'true') {
      return false;
    }

    const duracao = await video.evaluate(element => element.duration);
    const tempoAtual = await video.evaluate(element => element.currentTime);
    const posicaoRecuo = caixaControle.width * 0.2;
    const posicaoAvanco = caixaControle.width * 0.8;

    if (tempoAtual >= duracao * 0.75) {
      await controleReproducao.click({ position: { x: posicaoRecuo, y: caixaControle.height / 2 } });
      await expect.poll(() => video.evaluate(element => element.currentTime)).toBeLessThan(tempoAtual);
    }

    const tempoAntesAvanco = await video.evaluate(element => element.currentTime);
    await controleReproducao.click({ position: { x: posicaoAvanco, y: caixaControle.height / 2 } });
    await expect.poll(() => video.evaluate(element => element.currentTime)).toBeGreaterThan(tempoAntesAvanco);

    const tempoAntesRecuo = await video.evaluate(element => element.currentTime);
    await controleReproducao.click({ position: { x: posicaoRecuo, y: caixaControle.height / 2 } });
    await expect.poll(() => video.evaluate(element => element.currentTime)).toBeLessThan(tempoAntesRecuo);
    return true;
  }

  async recarregarAula() {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
  }

  async voltar() {
    await this.linkVoltar.dispatchEvent('click');
  }

  async validarUrlCursoExibido(urlEsperada) {
    await expect(this.page.locator('#el_1748130494432_340')).toContainText('Pro');
    await expect(this.page).toHaveURL(urlEsperada);
  }
}

module.exports = { CursoPage };