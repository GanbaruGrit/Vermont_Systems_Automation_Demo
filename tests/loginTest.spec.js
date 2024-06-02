// @ts-check
const { test, selectors } = require('@playwright/test');
const { default: MainMenuPage } = require('./Support/PageObjectModel/Pages/mainMenu.page');
const { default: LoginPage } = require('./Support/PageObjectModel/Pages/login.page');

const username = 'alowry';
const password = 'Automation101!';

test.beforeAll('Setup', async ({ browser }) => {
    console.log('Before tests');
    const context = browser.newContext();
    (await context).clearCookies();
    await selectors.setTestIdAttribute("data-title"); // Matches Vermont Systems conventions
  });

test.describe.parallel('Login test Chrome', { tag: '@smoke', }, async ({ page }) => { 
    const mainMenuPage = new MainMenuPage(page);
    const loginPage = new LoginPage(page);
    test.setTimeout(180000);

    await mainMenuPage.goto();
    await mainMenuPage.clickMyAccountButton();
    await loginPage.clickUsernameField();
    await loginPage.fillUsernameField(username);
    await loginPage.clickPasswordField();
    await loginPage.fillPasswordField(password);
    await loginPage.clickLoginButton();

    if (await page.getByRole('heading', { name: 'Login Warning - Active' }).isVisible())
        {
            await page.getByRole('button', { name: 'Continue with Login' }).click();

        }
    await page.waitForTimeout(10000);

    await loginPage.assertLoginButtonAuthenticated();
    console.log("Login Test - Passed");
});

test.describe.parallel('Login test Firefox', { tag: '@smoke', }, async ({ page }) => { 
    const mainMenuPage = new MainMenuPage(page);
    const loginPage = new LoginPage(page);
    test.setTimeout(180000);

    await mainMenuPage.goto();
    await mainMenuPage.clickMyAccountButton();
    await loginPage.clickUsernameField();
    await loginPage.fillUsernameField(username);
    await loginPage.clickPasswordField();
    await loginPage.fillPasswordField(password);
    await loginPage.clickLoginButton();

    if (await page.getByRole('heading', { name: 'Login Warning - Active' }).isVisible())
        {
            await page.getByRole('button', { name: 'Continue with Login' }).click();

        }
    await page.waitForTimeout(10000);

    await loginPage.assertLoginButtonAuthenticated();
    console.log("Login Test - Passed");
});

test.describe.parallel('Login test Safari', { tag: '@smoke', }, async ({ page }) => { 
    const mainMenuPage = new MainMenuPage(page);
    const loginPage = new LoginPage(page);
    test.setTimeout(180000);

    await mainMenuPage.goto();
    await mainMenuPage.clickMyAccountButton();
    await loginPage.clickUsernameField();
    await loginPage.fillUsernameField(username);
    await loginPage.clickPasswordField();
    await loginPage.fillPasswordField(password);
    await loginPage.clickLoginButton();

    if (await page.getByRole('heading', { name: 'Login Warning - Active' }).isVisible())
        {
            await page.getByRole('button', { name: 'Continue with Login' }).click();

        }
    await page.waitForTimeout(10000);

    await loginPage.assertLoginButtonAuthenticated();
    console.log("Login Test - Passed");
});

test.describe.parallel('Login test Edge', { tag: '@smoke', }, async ({ page }) => { 
    const mainMenuPage = new MainMenuPage(page);
    const loginPage = new LoginPage(page);
    test.setTimeout(180000);

    await mainMenuPage.goto();
    await mainMenuPage.clickMyAccountButton();
    await loginPage.clickUsernameField();
    await loginPage.fillUsernameField(username);
    await loginPage.clickPasswordField();
    await loginPage.fillPasswordField(password);
    await loginPage.clickLoginButton();

    if (await page.getByRole('heading', { name: 'Login Warning - Active' }).isVisible())
        {
            await page.getByRole('button', { name: 'Continue with Login' }).click();

        }
    await page.waitForTimeout(10000);

    await loginPage.assertLoginButtonAuthenticated();
    console.log("Login Test - Passed");
});

test.describe.parallel('Login test Opera', { tag: '@smoke', }, async ({ page }) => { 
    const mainMenuPage = new MainMenuPage(page);
    const loginPage = new LoginPage(page);
    test.setTimeout(180000);

    await mainMenuPage.goto();
    await mainMenuPage.clickMyAccountButton();
    await loginPage.clickUsernameField();
    await loginPage.fillUsernameField(username);
    await loginPage.clickPasswordField();
    await loginPage.fillPasswordField(password);
    await loginPage.clickLoginButton();

    if (await page.getByRole('heading', { name: 'Login Warning - Active' }).isVisible())
        {
            await page.getByRole('button', { name: 'Continue with Login' }).click();

        }
    await page.waitForTimeout(10000);

    await loginPage.assertLoginButtonAuthenticated();
    console.log("Login Test - Passed");
});