import {remote} from 'webdriverio';

const capabilities = {
  "platformName": "Android",
  "appium:automationName": "UiAutomator2",
  "appium:deviceName": "emulator-5554",
  "appium:appPackage": "com.android.settings",
  "appium:appActivity": ".Settings"
};

const wdOpts = {
  hostname: 'localhost',
  port: 4723,
  logLevel: 'info',
  capabilities,
};

async function runTest() {
  const driver = await remote(wdOpts);
  try {
    const displayItem = await driver.$('(//android.widget.LinearLayout[@resource-id="com.android.settings:id/dashboard_tile"])[5]');
    await displayItem.click();
    const moreItem = await driver.$('//android.support.v7.widget.RecyclerView[@resource-id="com.android.settings:id/list"]/android.widget.LinearLayout[5]');
    await moreItem.click();
    const displaySizeItem = await driver.$('//android.support.v7.widget.RecyclerView[@resource-id="com.android.settings:id/list"]/android.widget.LinearLayout[6]');
    await displaySizeItem.click();
    const plusButtonItem = await driver.$('//android.widget.ImageView[@content-desc="Make larger"]');
    // const minusButtonItem = await driver.$('//android.widget.ImageView[@content-desc="Make smaller"]');
    await plusButtonItem.click();
    await plusButtonItem.click();
    const backButtonItem = await driver.$('//android.widget.ImageButton[@content-desc="Navigate up"]')
    await backButtonItem.click();
    await backButtonItem.click();
  } finally {
    await driver.pause(2000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);