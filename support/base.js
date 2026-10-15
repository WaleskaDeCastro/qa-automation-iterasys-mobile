const { chromium, devices } = require('playwright');

class Base {
  async openBrowser() {
    this.browser = await chromium.launch({ headless: false });
    
    // Você pode escolher um dispositivo da lista do Playwright, por exemplo:
    const emulatedDevice = devices['Pixel 5']; 

    // Passamos o dispositivo para o newContext para ativar o viewport mobile, user agent e touch
    this.context = await this.browser.newContext({
      ...emulatedDevice
    });

    this.page = await this.context.newPage();
    return this.page;
  }

  async closeBrowser() {
    await this.browser.close();
  }
}

module.exports = { Base };