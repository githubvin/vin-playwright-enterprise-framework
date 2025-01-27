import { test } from "../fixtures/loginFixture"; 


// from the custom fixture file that we imported above we are using the homePage 
test(`Test using custom fixture`, async({homePage}) => {
    await homePage.expectServiceTitleToBeVisible(); 
})