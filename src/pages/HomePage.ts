

import {expect, Page} from "@playwright/test"; 



export default class HomePage {

    private readonly serviceTitleLocator = "Service"; 

    constructor(private page: Page) {
        // no need to mention as this.page 
    }

    async expectServiceTitleToBeVisible() {
        await expect(this.page.getByTitle(this.serviceTitleLocator))
        .toBeVisible({timeout: 15000}).catch((error) => {
            throw error; 
        }); 
    }

}