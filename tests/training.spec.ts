import { verifyBasicAuth } from "../pages/basic-auth";
import { addRemovePage } from "../pages/manual-add-rm";
import { VerifyBrokenPage } from "../pages/broken-images";
//import { authPage } from '../fixture/baiscAuthLogin';
import { VerifyCheckBox } from "../pages/checkboxs";
import { VerifyDialogue } from "../pages/dialogue";
import { VerifyDigestPage } from "../pages/digest-auth";
//import { DigestLoggin } from '../fixture/digest-auth';
import { test } from "../fixture/fixture-manager";
import { VerifyDisappearPage } from "../pages/disappear-page";
import { VerifyDrag } from "../pages/drag";
import { VerifyDropdown } from "../pages/dropdown";
import { expect } from "@playwright/test";
import { DynamicPage } from "../pages/dynamic-page";
import { ElementRender } from "../pages/element-render";

test("verify login page of basic auth", async ({ authPage }) => {
  test.setTimeout(30_000);
  const auth = new verifyBasicAuth(authPage);
  const headingContent = /Basic Auth/i;
  const textContent = /Congratulations/i;
  await auth.expectContentCorrect(headingContent, textContent);
});

test("verify the manual add/remove button", async ({ page }) => {
  test.setTimeout(30_000);
  const manual = new addRemovePage(page);
  const url = "https://the-internet.herokuapp.com/add_remove_elements/";
  const heading = "Add/Remove Elements";
  await manual.navigateAndVerifyPageContent(url, heading);
  await manual.verifyAddDeleteButton(3);
});

test("verify Broken Images", async ({ page }) => {
  const verifyBrokenImages = new VerifyBrokenPage(page);
  await verifyBrokenImages.NavigateAndVerifyHeading(
    "https://the-internet.herokuapp.com/broken_images",
    "Broken Images"
  );
  await verifyBrokenImages.VerifyImage();
});

test("should containing heading and mark checked when click", async ({
  page,
}) => {
  const checkbox = new VerifyCheckBox(page);
  await page.goto("https://the-internet.herokuapp.com/checkboxes");
  await page.getByRole("checkbox").nth(1).click();
  await checkbox.verifyHeading("Checkboxes");
  await checkbox.verifyClickCheckbox(2);
});

test("should check the dialogue box successful", async ({ page }) => {
  const verifuDialogueBox = new VerifyDialogue(page);
  await page.goto("https://the-internet.herokuapp.com/context_menu");
  await verifuDialogueBox.verifyHeadingAndText("Context Menu");
  await verifuDialogueBox.verifyDialogue("You selected a context menu");
});

test("should access the digest page", async ({ digestLogin }) => {
  const verifyDigestPage = new VerifyDigestPage(digestLogin);
  await verifyDigestPage.verifyHeadingAndText(
    "Digest Auth",
    "Congratulations! You must have the proper credentials."
  );
});

test("should verify failed link responses", async ({ page }) => {
  const verifyDisappearPage = new VerifyDisappearPage(page);
  await verifyDisappearPage.navigateAndVerifyLoadingStatus(
    "https://the-internet.herokuapp.com/disappearing_elements"
  );
  await verifyDisappearPage.verifyLinkClick(
    [200, 404, 404, 404],
    [/Welcome to the-internet/i, /Not Found/i, /Not Found/i, /Not Found/i]
  );
});

test("should exchange the element name when drag context A to B", async ({
  page,
  browserName,
}) => {
  test.skip(browserName === "webkit", "Known WebKit drag issue");
  const verifyDrag = new VerifyDrag(page);
  await verifyDrag.navigateToDragPage(
    "https://the-internet.herokuapp.com/drag_and_drop"
  );
  await verifyDrag.dragAndDrop("A", "B");
});

//16:16

test("should show expected options in the dropdown list", async ({ page }) => {
  const verifyDropdown = new VerifyDropdown(page);
  const url = "https://the-internet.herokuapp.com/dropdown";
  const heading = "Dropdown List";
  const expectedOptions = [
    { option: "1", expectedText: "Option 1" },
    { option: "2", expectedText: "Option 2" },
  ];

  await verifyDropdown.navigateToDropdownPage(url);
  expect(await verifyDropdown.getHeadingContent()).toContain(heading);
  for (let i = 0; i < expectedOptions.length; i++) {
    await verifyDropdown.selectOption(expectedOptions[i].option);
    expect(await verifyDropdown.getSelectedOptionText()).toContain(
      expectedOptions[i].expectedText
    );
  }
});
//16:31 pass

//10:43

test("should display expected contents in dynamic page", async ({ page }) => {
  const dynamicPage = new DynamicPage(page);
  const url = "https://the-internet.herokuapp.com/dynamic_controls";
  const heading = /Dynamic Controls/i;
  const instruction = /This example demonstrates when elements/i;
  const enableMessage = /It's enabled/i;
  const disableMessage = /It's disabled/i;

  await dynamicPage.navigateToDynamicPage(url);
  expect(await dynamicPage.getHeading()).toMatch(heading);
  expect(await dynamicPage.getInstruction()).toMatch(instruction);

  expect(await dynamicPage.existenceOfCheckbox()).toBeTruthy();
  expect(await dynamicPage.existenceOfEnableButton()).toBeTruthy();

  await dynamicPage.clickRemoveBotton();
  expect(await dynamicPage.existenceOfCheckbox()).toBeFalsy();

  await dynamicPage.clickAddButton();
  expect(await dynamicPage.existenceOfCheckbox()).toBeTruthy();

  await dynamicPage.clickEnableButton();
  expect(await dynamicPage.getEnableMessage()).toMatch(enableMessage);

  await dynamicPage.clickDisableButton();
  expect(await dynamicPage.getDisableMessage()).toMatch(disableMessage);
});

//12:00

//13:12

test("should display expected element content in dynamic page", async ({
  page,
}) => {
  const dynamicPage = new ElementRender(page);
  const url = "https://the-internet.herokuapp.com/dynamic_loading";
  const heading = /Dynamically Loaded Page Elements/i;

  const paragragh1 = /It's common to see an action/i;
  const paragragh2 = /There are two examples/i;
  const successMessage = /Hello World!/i;

  await test.step("Navigate and verify static content", async () => {
    await dynamicPage.navigateToElementRenderPage(url);
    expect(await dynamicPage.getHeading()).toMatch(heading);
    expect(await dynamicPage.getParagraphContent1()).toMatch(paragragh1);
    expect(await dynamicPage.getParagraphContent2()).toMatch(paragragh2);
  });

  await test.step("Verify dynamic Example 1", async () => {
    await dynamicPage.clickExample1();
    expect(await dynamicPage.getClickExample1StartButtonText()).toMatch(
      successMessage
    );
    await page.goBack();
  });

  await test.step("Verify dynamic Example 2", async () => {
    await dynamicPage.clickExample2();
    expect(await dynamicPage.getClickExample2StartButtonText()).toMatch(
      successMessage
    );
    await page.goBack();
  });
});

//13:50 pass
