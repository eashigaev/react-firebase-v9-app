import puppeteer, {Browser, HTTPResponse, Page} from "puppeteer";

describe("App", () => {

    let browser: Browser;
    let page: Page;

    // Settings (headless: true - an invisible mode)
    let launchOptions = {
        headless: false,
        slowMo: 0
    };

    if (!launchOptions.headless) {
        jest.setTimeout(60000);
    }

    // Support
    const path = (url: string) => `http://localhost:3000${url}`
    const selectors = {
        app: '.App',
        todoForm: '.todo-form',
        todoFormInput: '.todo-form input[type=text]',
        todoFormSubmit: '.todo-form button[type=submit]',
        todoToggle: '.todo-toggle',
        todoRemove: '.todo-remove',
        notificationsStatus: '.status',
        googleAuth: '.google-auth',
    }
    const params = {
        toggleMark: '✅'
    }
    const helpers = {
        textContent: (e: Element) => e.textContent,
        innerHtml: (e: Element) => e.innerHTML,
        successResponse: (response: HTTPResponse) => response.status() === 200,
        findTrsByContent: (content: string) => `//tbody//tr[contains(., '${content}')]`,
    }

    const itManagesTodoList = async (sync: boolean) => {
        const fixtureTitle = "Test todo title " + Math.random();

        // Create
        await page.type(selectors.todoFormInput, fixtureTitle);
        await page.click(selectors.todoFormSubmit);
        !sync && await page.waitForResponse(helpers.successResponse);

        // Read
        let trs = await page.$x(helpers.findTrsByContent(fixtureTitle));
        expect(trs.length).not.toBe(0);
        let text = await trs[0].evaluate(helpers.innerHtml);
        expect(text).not.toContain(params.toggleMark);

        // Toggle
        const todoToggle = await trs[0].$(selectors.todoToggle);
        await todoToggle?.click();
        !sync && await page.waitForResponse(helpers.successResponse);
        trs = await page.$x(helpers.findTrsByContent(fixtureTitle));
        text = await trs[0].evaluate(helpers.innerHtml);
        expect(text).toContain(params.toggleMark);

        // Remove
        const todoRemove = await trs[0].$(selectors.todoRemove);
        await todoRemove?.click();
        !sync && await page.waitForResponse(helpers.successResponse);
        trs = await page.$x(helpers.findTrsByContent(fixtureTitle));
        expect(trs.length).toBe(0);
    }

    // Go! Go! Go!

    beforeAll(async () => {
        browser = await puppeteer.launch(launchOptions);
        page = await browser.newPage();
    });

    it("contains title", async () => {
        await page.goto(path('/'));
        await page.waitForSelector(selectors.app);
        const text = await page.$eval(selectors.app, helpers.textContent);
        expect(text).toContain("React Firebase v9");
    });

    it("contains navigation", async () => {
        await page.goto(path('/'));
        await page.waitForSelector('[href="/firebase"]');
        await page.click('[href="/firebase"]');
        expect(page.url()).toBe(path('/firebase'));
        await page.waitForSelector('[href="/"]');
        await page.click('[href="/"]');
        expect(page.url()).toBe(path('/'));
    });

    it("shows the not found page", async () => {
        await page.goto(path('/not-found-page'));
        await page.waitForSelector(selectors.app);
        const text = await page.$eval(selectors.app, helpers.textContent);
        expect(text).toContain("Not Found");
    });

    describe("In Memory Todo List Page", () => {

        beforeAll(async () => {
            await page.goto(path('/'));
        });

        it("shows the first page", async () => {
            await page.waitForSelector(selectors.app);
            const text = await page.$eval(selectors.app, helpers.textContent);
            expect(text).toContain("In Memory Todo List");
        });

        it("manages in memory todos", async () => {
            await itManagesTodoList(true);
        });
    });

    describe("Firebase Todo List Page", () => {

        beforeAll(async () => {
            await page.goto(path('/firebase'));
        });

        it("shows the second page", async () => {
            await page.waitForSelector(selectors.app);
            const text = await page.$eval(selectors.app, helpers.textContent);
            expect(text).toContain("Firebase Todo List");
        });

        it("manages firebase todos", async () => {
            await itManagesTodoList(false);
        });
    });

    describe("Notifications", () => {

        it("needs permission", async () => {
            await page.goto(path('/'));
            await page.waitForSelector(selectors.app);
            const text = await page.$eval(selectors.notificationsStatus, helpers.textContent);
            expect(text).toContain(!launchOptions.headless ? "denied": "default");
        });

        it("says permission OK", async () => {
            const context = browser.defaultBrowserContext();
            await context.overridePermissions(path(''), ['notifications']);
            await page.goto(path('/'));
            const granted = await page.evaluate(async () => {
                return (await navigator.permissions.query({name: 'notifications'})).state;
            });
            expect(granted).toBe('granted');
            const text = await page.$eval(selectors.notificationsStatus, helpers.textContent);
            expect(text).toContain('granted');
            await context.clearPermissionOverrides();
        });
    });

    describe("Google authentication", () => {

        jest.setTimeout(20000);

        it("shows popup", async () => {
            await page.goto(path('/'));
            const newPagePromise = new Promise<Page>(x => page.once('popup', x));
            await page.click(selectors.googleAuth);
            const popup = await newPagePromise;
            await popup.waitForNavigation();
            let url = 'https://accounts.google.com';
            if (!launchOptions.headless) {
                url += '/o/oauth2/auth/identifier';
            }
            expect(popup.url()).toContain(url);
            await popup.close();
        });
    });

    afterAll(() => browser.close());
});
