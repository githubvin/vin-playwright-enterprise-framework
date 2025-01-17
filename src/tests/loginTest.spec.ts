
import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";


test(`simple login test`, async({page}) => {
    
    const loginPage = new LoginPage(page); 

    await loginPage.navigateToLoginPage(); 
    // await loginPage.fillUsername("vinothksc@gmail.com"); 
    // await loginPage.fillPassword("Salesforce@1"); 
    // to avoid hardcoding we are passing the credentials from env file 
    await loginPage.fillUsername(process.env.userid!); 
    await loginPage.fillPassword(process.env.password!); 

    const homePage = await loginPage.clickLoginButton(); 
    // here we are creating homepage object at the step of click login since it will return HomePage 
    // this is called page object chaining. Login and home page arrival is clubbed or chained 
    await homePage.expectServiceTitleToBeVisible(); 

})
