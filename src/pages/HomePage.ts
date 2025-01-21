

import {expect, Page} from "@playwright/test"; 
import logger from "../utils/LoggerUtil";



export default class HomePage {

    private readonly serviceTitleLocator = "Service"; 

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

}