import { expect, Page } from '@playwright/test'

export default class MainMenuPage
{
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async goto() {
        await this.page.goto("https://qa-joeb.vermontsystems.com/wbwsc/webtrac_QATEST.wsc/splash.html?InterfaceParameter=WebTrac_NextGen/");
    }

    // Locators
    myAccountButton = () => this.page.getByRole('link', { name: 'My Account Sign In / Register' });
    searchButton = () => this.page.getByRole('link', { name: 'Search' });
    makeDonationButton = () => this.page.getByRole('link', { name: 'Make A Donation' });
    reprintReceiptButton = () => this.page.getByRole('link', { name: 'Reprint A Receipt' });

    // Actions
    public async clickMyAccountButton() {
        await this.myAccountButton().click();
    }

    public async clickSearchButton() {
        await this.searchButton().click();
    }

    public async clickMakeDonationButton() {
        await this.makeDonationButton().click();
    }

    // Assertions
    public async assertTitleIsVisible() {
        await expect(this.page).toHaveTitle("WebTrac Next Gen (QATest) - Splash");
    }

    public async assertSearchButtonIsVisible() {
        await expect(this.searchButton()).toBeVisible();
    }

    public async assertMakeDonationButtonIsVisible() {
        await expect(this.makeDonationButton()).toBeVisible();
    }
}