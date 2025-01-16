
import {Page} from "@playwright/test"; 
import HomePage from "./HomePage";

export default class LoginPage {

    private readonly usernameInputSelector = "#username"; 
    private readonly usernameInputSelectors = ["#username", ".username", "input[name='username']", "//*[@id='username']"]; 
    private readonly passwordInputSelector = "#password"; 
    private readonly loginButtonSelector = "#Login"; 


    constructor(private page: Page) {
        // no need to mention the page object here like this.page 
    }


    async quickLogin(username: string, password: string) {
        await this.navigateToLoginPage(); 
        await this.fillUsername(username); 
        await this.fillPassword(password); 
        return await this.clickLoginButton(); 
    } 

    async navigateToLoginPage() {
       await this.page.goto("https://login.salesforce.com"); 
    }

    async fillUsername(username: string) {
        await this.page.locator(this.usernameInputSelector).fill(username); 
    } 

    async fillPassword(password: string) {
        await this.page.locator(this.passwordInputSelector).fill(password); 
    }

    async clickLoginButton() {
        await this.page
        .locator(this.loginButtonSelector)
        .click()
        .catch((error) => {
            throw error; 
        })

        const homePage = new HomePage(this.page); 
        return homePage; 
    }

}
