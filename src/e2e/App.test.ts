import puppeteer, {Browser, Page} from "puppeteer";

describe("App", () => {
    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    it("contains the welcome text", async () => {
        await page.goto("http://localhost:3000");
        await page.waitForSelector(".App");
        const text = await page.$eval(".App", (e) => e.textContent);
        expect(text).toContain("Welcome to the app!");
    });

    it("contains the first page", async () => {
        await page.goto("http://localhost:3000/");
        await page.waitForSelector(".App");
        const text = await page.$eval(".App", (e) => e.textContent);
        expect(text).toContain("In Memory Todo List");
    });

    it("contains the second page", async () => {
        await page.goto("http://localhost:3000/second");
        await page.waitForSelector(".App");
        const text = await page.$eval(".App", (e) => e.textContent);
        expect(text).toContain("Firebase Todo List");
    });

    it("contains the not found page", async () => {
        await page.goto("http://localhost:3000/not-found-page");
        await page.waitForSelector(".App");
        const text = await page.$eval(".App", (e) => e.textContent);
        expect(text).toContain("Not Found");
    });

    afterAll(() => browser.close());
});
