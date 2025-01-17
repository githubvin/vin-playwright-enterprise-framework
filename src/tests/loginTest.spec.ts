
import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage"; 
import { encrypt, decrypt } from "../utils/CryptojsUtil"; 
// import { encryptEnvFile, decryptEnvFile } from "../utils/EncryptenvFile"; 


test(`simple login test`, async({page}) => {
    
    const loginPage = new LoginPage(page); 

    await loginPage.navigateToLoginPage(); 
    // await loginPage.fillUsername("vinothksc@gmail.com"); 
    // await loginPage.fillPassword("Salesforce@1"); 
    // to avoid hardcoding we are passing the credentials from env file 
    await loginPage.fillUsername(decrypt(process.env.userid!)); 
    await loginPage.fillPassword(decrypt(process.env.password!)); 

    const homePage = await loginPage.clickLoginButton(); 
    // here we are creating homepage object at the step of click login since it will return HomePage 
    // this is called page object chaining. Login and home page arrival is clubbed or chained 
    await homePage.expectServiceTitleToBeVisible(); 

}) 


// this test is used to call the encryption function to encrypt env content 
// // this test is run for one time just for encryption of env file 
// test(`encrypting env content`, async() => {  
//     encryptEnvFile(); 
// })
