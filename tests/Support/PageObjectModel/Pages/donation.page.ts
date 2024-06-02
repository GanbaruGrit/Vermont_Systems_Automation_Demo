import { expect, Page } from '@playwright/test'

export default class DonationPage
{
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async goto() {
        await this.page.goto("https://qa-joeb.vermontsystems.com/wbwsc/webtrac_QATEST.wsc/donation.html"); // Will error without token
    }

    // Locators
    donateRadioButton = () => this.page.getByLabel('Check to purchase Donation (');
    searchButton = () => this.page.getByRole('link', { name: 'Search' });
    makeDonationButton = () => this.page.getByRole('link', { name: 'Make A Donation' });
    addToCartButton = () => this.page.getByRole('button', { name: 'Add To Cart' });
    continueButton = () => this.page.getByRole('button', { name: 'Continue' });
    proceedCheckoutButton = () => this.page.getByRole('link', { name: 'Proceed To Checkout' });
    donationHeading = () => this.page.getByRole('heading', { name: 'Donation (enter $ Amt) (' }).first();
    donationAddRadioButton = () => this.page.locator('svg.checkbox__check.svg-icon.svg-fill'); // these three could use data-id tags
    donationFeeField = () => this.page.getByRole('textbox', { name: '', includeHidden: false }).first();
    donationQuantity = () => this.page.locator('input.fillin.fieldid--9.disabled.decimal.text-left');
    donationRemoveButton = () => this.page.getByRole('link', { name: 'Remove' }).first();
    donationDescription = () => this.page.getByRole('cell', { name: 'Donation (enter $ Amt) (' }).first();
    donationName = () => this.page.getByRole('cell', { name: 'Amanda' }).first(); // verify correct user before checkout, needs to be stored in a var earlier // .first() to cover multiple entries
    donationTotalFees = () => this.page.getByRole('cell', { name: '$ 100.00' }).first()
    confirmationNumber = () => this.page.locator('//*[@id="webconfirmation_emailtext"]/h3').innerText()

    // Actions
    public async checkDonateRadioButton() {
        await this.donateRadioButton().check();
    }

    public async clickAddToCartButton() {
        await this.addToCartButton().click();
    }

    public async clickContinueButton() {
        await this.continueButton().click();
    }

    public async clickProceedCheckoutButton() {
        await this.proceedCheckoutButton().click();
    }

    public async checkDonationAddRadioButton() {
        await this.donationAddRadioButton().check();
    }

    public async fillDonationFeeField() {
        await this.donationFeeField().fill("100");
    }

    // Assertions
    public async assertContinueButtonIsVisible() {
        await expect(this.continueButton()).toBeVisible();
    }

    public async assertDonateRadioButtonIsVisible() {
        await expect(this.donateRadioButton()).toBeVisible();
    }

    public async assertDonateRadioButtonIsChecked() {
        await expect(this.donateRadioButton()).toBeChecked();
    }

    public async assertCheckoutButtonIsVisible() {
        await expect(this.proceedCheckoutButton()).toBeVisible();
    }

    public async assertDonationHeadingIsVisible() {
        await expect(this.donationHeading()).toBeVisible();
    }

    public async assertDonationAddRadioButtonIsChecked() {
        await expect(this.donationAddRadioButton()).toBeChecked();
    }

    public async assertDonationFeeFieldHasValue() {
        await expect(this.donationFeeField()).toHaveValue("100");
    }

    public async assertDonationRemoveButtonIsVisible() {
        await expect(this.donationRemoveButton()).toBeVisible();
    }

    public async assertDonationDescriptionIsVisible() {
        await expect(this.donationDescription()).toBeVisible();
    }

    public async assertDonationNameIsVisible() {
        await expect(this.donationName()).toBeVisible();
    }

    public async assertDonationTotalFeesIsVisible() {
        await expect(this.donationTotalFees()).toBeVisible();
    }
}