import { expect, Page } from '@playwright/test'

export default class LoginPage
{
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async goto() {
        await this.page.goto("https://qa-joeb.vermontsystems.com/wbwsc/webtrac_QATEST.wsc/login.html"); // Will error without token
    }

    // Locators
    usernameField = () => this.page.getByLabel('Username *');
    passwordField = () => this.page.getByLabel('Password *');
    loginButton = () => this.page.getByRole('button', { name: 'Login' });
    logoutButton = () => this.page.getByRole('link', { name: 'Logout' });
    loginButtonPostLogin = () => this.page.getByRole('link', { name: 'Amanda VSTest #' });

    // Actions
    public async clickUsernameField() {
        await this.usernameField().click();
    }

    public async fillUsernameField(username) {
        await this.usernameField().fill(username);
    }

    public async clickPasswordField() {
        await this.passwordField().click();
    }

    public async fillPasswordField(password) {
        await this.passwordField().fill(password);
    }

    public async clickLoginButton() {
        await this.loginButton().click();
    }

    public async clickPostLoginButton() {
        await this.loginButtonPostLogin().click();
    }

    // Asssertions
    public async assertLoginButtonAuthenticated() {
        await expect(this.loginButtonPostLogin()).toBeVisible();
    }

    public async assertLogoutButtonIsVisible() {
        await expect(this.logoutButton()).toBeVisible();
    }
}