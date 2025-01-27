
import { expect, test } from "@playwright/test";
import LoginPage from "../pages/LoginPage"; 
import logger from "../utils/LoggerUtil";
import { encrypt, decrypt } from "../utils/CryptojsUtil"; 
// import { encryptEnvFile, decryptEnvFile } from "../utils/EncryptenvFile"; 

// declaring variable to store the authentication with storage context 
const authFile = "src/config/auth.json"; 

test.skip(`simple login test`, async({page}) => {
    
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
    logger.info("Test for login is completed"); 

    // using storage state we are going to save this context 
    await page.context().storageState({path: authFile}); 
}) 


test.skip(`Login and store the context example test`, async({page}) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"); 
    await page.locator("[name='username']").fill("Admin"); 
    await page.getByPlaceholder("Password").fill("admin123"); 
    await page.getByRole('button', "Login").click(); 

    await page.context().storageState({path: "src/config/orangehrmauth.json"}); 
    // Even this auth file details may expire it is not recommended to push the auth files into repository for security reasons 

})


test(`Login with orange hrm auth file `, async({browser}) => {

    const context = await browser.newContext({storageState: "src/config/orangehrmauth.json"}); 
    const page = await context.newPage(); 
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"); 

    // validating text in the dashboard 
    await expect(page.getByText("Time at Work")).toBeVisible({timeout: 4000}); 

    // we can store the login context by command line also 
    // npx playwright codegen <application URL> --save-storage=<path/auth.json>  

    // then using the same auth file here 
    // npx playwright codegen --load-storage=<path/auth.json> <app URL>

})


// another way to use the storage state 
// test.use({
//     storageState: "src/config/orangehrmauth.json"
// })


// this test is used to call the encryption function to encrypt env content 
// // this test is run for one time just for encryption of env file 
// test(`encrypting env content`, async() => {  
//     encryptEnvFile(); 
// })
