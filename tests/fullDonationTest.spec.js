// @ts-check
const { test, expect, selectors } = require('@playwright/test');
const { TIMEOUT } = require('dns');
const { default: MainMenuPage } = require('./Support/PageObjectModel/Pages/mainMenu.page');
const { default: LoginPage } = require('./Support/PageObjectModel/Pages/login.page');
const { default: DonationPage } = require('./Support/PageObjectModel/Pages/donation.page');
const { default: CheckoutPage } = require('./Support/PageObjectModel/Pages/checkout.page');
const exp = require('constants');

test.beforeAll('Setup', async ({ browser }) => {
    console.log('Before tests');
    // const context = browser.newContext();
    // const page = (await context).newPage();
    // (await context).clearCookies();

    // Save storage state into the file. Speeds up authentication and is reusable.
    // const storage = await context.storage_state(path="state.json");

    // Create a new context with the saved storage state. Create a snapshot of the session to re-use for testing.
    // const context = await browser.new_context(storage_state="state.json");

    await selectors.setTestIdAttribute("data-title"); // matches Vermont Systems conventions
  });

test('Add Donation To Cart Test', async ({ page, browser }) => {
    test.setTimeout(180000);
    
    // Page Object Model constructors
    const mainMenuPage = new MainMenuPage(page);
    const loginPage = new LoginPage(page);
    const donationPage = new DonationPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Credentials - Would suggest AWS Security key provider[AWS Secrets-manager] or Azure[AZURE Key Valut] for the key managment
    const username = '********';
    const password = '********';

    // Login
    await mainMenuPage.goto();

    await mainMenuPage.assertTitleIsVisible();
    await mainMenuPage.clickMyAccountButton();

    await loginPage.clickUsernameField();
    await loginPage.fillUsernameField(username);

    await loginPage.clickPasswordField();
    await loginPage.fillPasswordField(password);

    await loginPage.clickLoginButton();

    // Handle Active Session
    if (await page.getByRole('heading', { name: 'Login Warning - Active' }).isVisible())
        {
            await page.getByRole('button', { name: 'Continue with Login' }).click();

        }

    await page.waitForTimeout(2000);

    await loginPage.assertLoginButtonAuthenticated();
    await loginPage.clickPostLoginButton();
    await loginPage.assertLogoutButtonIsVisible();

    console.log("Login Test - Passed");
        
    // Empty cart for clean test
    await page.getByRole('link', { name: 'Checkout Cart' }).click();
    await page.getByRole('link', { name: 'Empty Cart' }).click();
    await mainMenuPage.goto();

    // Navigate and add donation to cart
    await mainMenuPage.assertSearchButtonIsVisible();
    await mainMenuPage.clickSearchButton();

    await mainMenuPage.assertMakeDonationButtonIsVisible();
    await mainMenuPage.clickMakeDonationButton();

    await page.waitForTimeout(5000);
    
    await donationPage.assertDonateRadioButtonIsVisible();
    await donationPage.checkDonateRadioButton();
    await donationPage.assertDonateRadioButtonIsChecked();

    await donationPage.clickAddToCartButton();
    await donationPage.assertDonationHeadingIsVisible();
    
    // Donation details
    await donationPage.checkDonationAddRadioButton();
    await donationPage.assertDonationAddRadioButtonIsChecked();

    await donationPage.fillDonationFeeField();
    await donationPage.assertDonationFeeFieldHasValue();

    await donationPage.assertContinueButtonIsVisible();
    await donationPage.clickContinueButton();

    await donationPage.assertDonationRemoveButtonIsVisible();
    await donationPage.assertDonationDescriptionIsVisible();
    await donationPage.assertDonationNameIsVisible();
    await donationPage.assertDonationTotalFeesIsVisible();
    await donationPage.assertCheckoutButtonIsVisible();

    await donationPage.clickProceedCheckoutButton();
    
    await page.waitForTimeout(8000);

    // Checkout
    if (await page.getByRole('button', { name: 'Using This Payment Method:' }).isVisible())
    {
        await checkoutPage.assertPaymentMethodButtonIsVisible();
        await checkoutPage.clickPaymentMethodButton();
        await checkoutPage.selectVisaPaymentMethodButton();

        await checkoutPage.assertEntireCCForm();
        await checkoutPage.fillEntireCCForm();

        await checkoutPage.assertCaptchaSectionIsVisible();
        await checkoutPage.clickCaptchaSection();

        await page.waitForTimeout(8000); // Waiting for captcha to finish

        await checkoutPage.clickContinueButton();

        // Confirmation Page
        const donationConfirmationNumber = await page.locator('//*[@id="webconfirmation_emailtext"]/h3').innerText();
        await loginPage.loginButtonPostLogin().click();
        await mainMenuPage.reprintReceiptButton().click();
        
        await page.waitForTimeout(100000); // Waiting for receipt page to populate // Would ideally use the polling function with intervals
        await page.reload();

        const receiptLocator = await page.locator('td.label-cell[data-title="Number"]').first();
        const receiptConfirmationNumber = await receiptLocator.innerText();

        await expect(donationConfirmationNumber).toMatch(receiptConfirmationNumber);

        console.log("Do receipts match? " + donationConfirmationNumber + " " + receiptConfirmationNumber);
        
        // Handle PDF Pop-up & Download
        const page1Promise = page.waitForEvent('popup');
        const downloadPromise = page.waitForEvent('download');
        await page.getByRole('link', { name: 'Reprint Receipt' }).first().click();
        await page.waitForTimeout(10000); // Waiting for download to finish
        const popup = await page1Promise;
        const download = await downloadPromise;
        
        console.log("file downloaded to", await download.path());
        console.log("If pop-up, URL and Title: " + popup.url() + " " + popup.title());
    
        await loginPage.loginButtonPostLogin().click();
        await loginPage.logoutButton().click();

    }
    else if (await page.getByRole('button', { name: 'Continue' }).isVisible())
        {
            console.log("Payment Method missing");
        }
    //await page.pause();
});

test.afterEach(async ({ page }) => {
  console.log(`Finished ${test.info().title} with status ${test.info().status}`);

  if (test.info().status !== test.info().expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});

test.afterAll('Teardown', async () => {
    console.log('Clear carts, caches, and reset database');
  });