

import {expect, Page} from "@playwright/test"; 
import logger from "../utils/LoggerUtil";
import ContactsPage from "./ContactsPage";


export default class HomePage {

    private readonly serviceTitleLocator = "Service"; 
    private readonly contactsLinkLocator = "Contacts"; 

    constructor(private page: Page) {
        // no need to mention as this.page 
    }

    async expectServiceTitleToBeVisible() {
        await expect(this.page.getByTitle(this.serviceTitleLocator))
        .toBeVisible({timeout: 15000}).catch((error) => { 
            logger.error(`Error clicking login button: ${error}`); 
            throw error; // rethrow error if needed 
        }).then(() => logger.info("Service Title is visible")); 
    } 

    async navigateToContactsTab() {

        await expect(this.page.getByRole('link', {name: this.contactsLinkLocator})).toBeVisible(); 
        logger.info("Contacts Tab is visible"); 
        await this.page.getByRole('link', {name: this.contactsLinkLocator}).click(); 
        logger.info("Contacts Tab is clicked"); 
        return new ContactsPage(this.page); 

    }

}