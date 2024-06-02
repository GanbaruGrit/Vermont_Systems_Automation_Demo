import { expect, Page } from '@playwright/test'

export default class CheckoutPage
{
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async goto() {
        await this.page.goto("https://qa-joeb.vermontsystems.com/wbwsc/webtrac_QATEST.wsc/checkout.html"); // Will error without token
    }

    // Locators
    paymentMethodButton = () => this.page.getByRole('button', { name: 'Using This Payment Method:' });
    visaPaymentMethod = () => this.page.getByLabel('Select A Payment Method').getByText('Visa Payment');
    ccName = () => this.page.frameLocator('#name iframe').getByRole('textbox');
    ccNumber = () => this.page.frameLocator('#number iframe').getByRole('textbox');
    ccExpirationDate = () => this.page.frameLocator('#expiration_date iframe').getByRole('textbox');
    ccSecurityCode = () => this.page.frameLocator('#security_code iframe').getByRole('textbox');
    ccAddress = () => this.page.frameLocator('#address_line1 iframe').getByRole('textbox');
    ccPostalCode = () => this.page.frameLocator('#address_postal_code iframe').getByRole('textbox');
    captchaSection = () => this.page.frameLocator('[title="reCAPTCHA"]').getByRole('checkbox', { name: 'I\'m not a robot' });
    continueButton = () => this.page.getByRole('button', { name: 'Continue' });

    // Actions
    public async clickPaymentMethodButton() {
        await this.paymentMethodButton().click();
    }

    public async selectVisaPaymentMethodButton() {
        await this.visaPaymentMethod().click();
    }

    public async fillCCName() {
        await this.ccName().click();
        await this.ccName().fill('Amanda Lowry');
    }

    public async fillCCNumber() {
        await this.ccNumber().click();
        await this.ccNumber().fill('4446 6612 3456 7892');
    }

    public async fillCCExpirationDate() {
        await this.ccExpirationDate().click();
        await this.ccExpirationDate().fill('06 / 26');
    }

    public async fillCCSecurityCode() {
        await this.ccSecurityCode().click();
        await this.ccSecurityCode().fill('999');
    }

    public async fillCCAddress() {
        await this.ccAddress().click();
        await this.ccAddress().fill('123 Main St');
    }

    public async fillCCPostalCode() {
        await this.ccPostalCode().click();
        await this.ccPostalCode().fill('05446');
    }

    public async clickCaptchaSection() {
        await this.captchaSection().click();
    }

    public async clickContinueButton() {
        await this.continueButton().click();
    }

    public async fillEntireCCForm() {
        await this.fillCCName();
        await this.fillCCNumber();
        await this.fillCCAddress();
        await this.fillCCExpirationDate();
        await this.fillCCSecurityCode();
        await this.fillCCPostalCode();
    }

    // Assertions
    public async assertPaymentMethodButtonIsVisible() {
        await expect(this.paymentMethodButton()).toBeVisible();
    }

    public async assertCCNameIsVisible() {
        await expect(this.ccName()).toBeVisible();
    }
    
    public async assertCCNumberIsVisible() {
        await expect(this.ccNumber()).toBeVisible();
    }

    public async assertCCExpirationDateIsVisible() {
        await expect(this.ccExpirationDate()).toBeVisible();
    }

    public async assertCCSecurityCodeIsVisible() {
        await expect(this.ccSecurityCode()).toBeVisible();
    }

    public async assertCCAddressIsVisible() {
        await expect(this.ccAddress()).toBeVisible();
    }

    public async assertCCPostalCodeIsVisible() {
        await expect(this.ccPostalCode()).toBeVisible();
    }

    public async assertCaptchaSectionIsVisible() {
        await expect(this.captchaSection()).toBeVisible();
    }
    
    public async assertEntireCCForm() {
        await this.assertCCNameIsVisible();
        await this.assertCCNumberIsVisible();
        await this.assertCCExpirationDateIsVisible();
        await this.assertCCSecurityCodeIsVisible();
        await this.assertCCPostalCodeIsVisible();
    }
}