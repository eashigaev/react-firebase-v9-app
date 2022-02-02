import puppeteer, {Browser, HTTPResponse, Page} from "puppeteer";

describe("App", () => {

    // Set true to display the browser
    const humanFriendly = false;

    let launchOptions = {
        headless: true,
        slowMo: 0
    };

    if (humanFriendly) {
        jest.setTimeout(60000);
        launchOptions = {
            ...launchOptions, headless: false, slowMo: 100
        }
    }

    let browser: Browser;
    let page: Page;

    // Support
    const path = (url: string) => `http://localhost:3000${url}`
    const selectors = {
        app: '.App',
        todoForm: '.todo-form',
        todoFormInput: '.todo-form input[type=text]',
        todoFormSubmit: '.todo-form button[type=submit]',
        todoToggle: '.todo-toggle',
        todoRemove: '.todo-remove'
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

    beforeAll(async () => {
        browser = await puppeteer.launch(launchOptions);
        page = await browser.newPage();
    });

    it("contains the welcome text", async () => {
        await page.goto(path('/'));
        await page.waitForSelector(selectors.app);
        const text = await page.$eval(selectors.app, helpers.textContent);
        expect(text).toContain("Welcome to the app!");
    });

    it("contains navigation", async () => {
        await page.goto(path('/'));
        await page.waitForSelector('[href="/second"]');
        await page.click('[href="/second"]');
        expect(await page.url()).toBe(path('/second'));
        await page.waitForSelector('[href="/"]');
        await page.click('[href="/"]');
        expect(await page.url()).toBe(path('/'));
    });

    it("shows the not found page", async () => {
        await page.goto(path('/not-found-page'));
        await page.waitForSelector(selectors.app);
        const text = await page.$eval(selectors.app, helpers.textContent);
        expect(text).toContain("Not Found");
    });

    describe("First page", () => {

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

    describe("Second page", () => {

        beforeAll(async () => {
            await page.goto(path('/second'));
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

    afterAll(() => browser.close());
});
