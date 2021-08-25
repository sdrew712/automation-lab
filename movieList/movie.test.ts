// Lines 2 through 6 are our boilerplate lines of code, we need them for our tests to work
import { Builder, Capabilities, By } from "selenium-webdriver"

const chromedriver = require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

// First we're going to navigate to Google.com
beforeAll(async () => {
  await driver.get('http://127.0.0.1:5500/movieList/index.html')
})

// And after our test has completed, we want to close our browser
afterAll(async () => {
  await driver.quit()
})

test("Add a movie to the page", async () => {

  let movieInput = await driver.findElement(By.xpath("/html/body/main/section/form/input"))

  let addButton = await driver.findElement(By.xpath("/html/body/main/section/form/button"))

  await movieInput.sendKeys("Avatar")

  await addButton.click()

  let movieListed = await driver.findElement(By.xpath("(//span)[1]"))

  expect(movieInput).toStrictEqual(movieListed)

  await driver.sleep(5000)
})

test("Delete a movie", async () => {
  let deleteButton = await driver.findElement(By.xpath("(//button[text()='x'])[1]"))

  await deleteButton.click();

  await driver.sleep(5000)
})
