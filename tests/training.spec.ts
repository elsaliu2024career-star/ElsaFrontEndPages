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
import { DownloadFile } from "../pages/download-file";
import { uploadFile } from "../pages/upload-file";
import { FloatingMenu } from "../pages/floating-item";
import { Slider } from "../pages/slider";
import { Hover } from "../pages/hover";
import { JQueryPage } from "../pages/jquery";
import { JavaDialogue } from "../pages/javascript-dialogue";
import { parseArgs } from "util";
import  {statusCode} from "../pages/status-code"
import { link } from "fs";
import { ChatMessage } from "../pages/database-api";

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

test("Should download link after click the link", async ({ page }) => {
  const downloadPage = new DownloadFile(page);
  const url = "https://the-internet.herokuapp.com/download";

  await downloadPage.navigateToDownloadPage(url);
  const filePath = await downloadPage.downloadFileToPath(
    "file.json",
    "storage"
  );
  console.log(`the file is saved to ${filePath}`);
  expect(downloadPage.isFileSavedInPath(filePath)).toBeTruthy;

  await downloadPage.cleanDownloadedFile(filePath);
  expect(downloadPage.isFileSavedInPath(filePath)).toBeFalsy;
  console.log(`the file is removed from ${filePath}`);
});

test("should upload file successfully", async ({ page }) => {
  const uploadFilePage = new uploadFile(page);
  const heading = /File Uploader/i;
  const paragraph = /^Choose a file on your system/i;
  const url = "https://the-internet.herokuapp.com/upload";
  const fileName = "storage/state-webkit.json";

  const uploadedHeading = /File Uploaded/i;

  await test.step("step1 upload the file", async () => {
    await uploadFilePage.navigateUploadPage(url);
    expect(await uploadFilePage.getHeading()).toMatch(heading);
    expect(await uploadFilePage.getParagraph()).toMatch(paragraph);
    expect(await uploadFilePage.uploadFile(fileName)).toBe(200);
  });

  await test.step("step2", async () => {
    expect(await uploadFilePage.getHeading()).toMatch(uploadedHeading);
  });
});

test("should fail if click upload directly", async ({ page }) => {
  const uploadFilePage = new uploadFile(page);
  const heading = /File Uploader/i;
  const paragraph = /^Choose a file on your system/i;
  const url = "https://the-internet.herokuapp.com/upload";
  // const fileName = 'storage/state-webkit.json';

  const uploadedHeading = /Internal Server Error/i;

  await test.step("step1 upload the file", async () => {
    await uploadFilePage.navigateUploadPage(url);
    expect(await uploadFilePage.getHeading()).toMatch(heading);
    expect(await uploadFilePage.getParagraph()).toMatch(paragraph);
    expect(await uploadFilePage.uploadBlankFile()).toBeGreaterThanOrEqual(400);
  });

  await test.step("step2", async () => {
    expect(await uploadFilePage.getHeading()).toMatch(uploadedHeading);
  });
});

test.skip("should fail if drag upload directly", async ({ page }) => {
  const uploadFilePage = new uploadFile(page);
  const heading = /File Uploader/i;
  const paragraph = /^Choose a file on your system/i;
  const url = "https://the-internet.herokuapp.com/upload";
  const fileName = "storage/state-webkit.json";

  const uploadedHeading = /Internal Server Error/i;

  await test.step("step1 upload the file", async () => {
    await uploadFilePage.navigateUploadPage(url);
    expect(await uploadFilePage.getHeading()).toMatch(heading);
    expect(await uploadFilePage.getParagraph()).toMatch(paragraph);
    expect(await uploadFilePage.dragUpload(fileName)).toBeGreaterThanOrEqual(
      400
    );
  });

  await test.step("step2", async () => {
    expect(await uploadFilePage.getHeading()).toMatch(uploadedHeading);
  });
});

//14:53 -14:18 14:33-16:38  30min in total

test("should detect floating items when scroll down", async ({ page }) => {
  test.setTimeout(90_000);
  const floatingItems = new FloatingMenu(page);
  const url = "https://the-internet.herokuapp.com/floating_menu#home";

  await floatingItems.navigateToFloatingMenuPage(url);
  await expect(await floatingItems.isFloatingMenuVisible(500)).toBeTruthy();
});

//22:19
test("should show the correct number when drag the slider", async ({
  page,
}) => {
  const sliderPage = new Slider(page);
  const url = "https://the-internet.herokuapp.com/horizontal_slider";
  const testNum = ["3", "10", "-5"]; // test different cases
  await sliderPage.navigateToSliderPage(url);

  for (let i = 0; i < testNum.length; i++) {
    let trimedNumber = await sliderPage.dragSlider(testNum[i]);
    expect(await sliderPage.getSliderPanelText()).toBe(trimedNumber);
  }
}); //23:05

// 11:00-12:46
test("should get expected info when hovering on the image", async ({
  page,
}) => {
  const hoverPage = new Hover(page);
  const url = "https://the-internet.herokuapp.com/hovers";
  const heading = /Hovers/i;
  const paragraph = /^Hover over the image/i;
  const isExpected: string[] = ["name: user1", "name: user2", "name: user3"];
  let eachText: string[] = [];

  await test.step("should should the expected heading, paragraph", async () => {
    await hoverPage.navigateHoverPage(url);
    expect(await hoverPage.getHeadingInfomation()).toMatch(heading);
    expect(await hoverPage.getParagraph()).toMatch(paragraph);
    eachText = await hoverPage.getHoverContent();
    eachText.forEach((value, index) =>
      console.log(`the hover text ${index + 1} is ${value}`)
    );
  });

  await test.step("should pass all the hover content verification", async () => {
    const result = await hoverPage.verifyStringArray(eachText, isExpected);

    result.eachVerification.forEach((result) =>
      console.log(`each result is ${result}`)
    );

    expect(result.isPassed).toBe(true);
  });
});

//14:59

test("should contain Jquery Menu", async ({ page }) => {
  const jqueryPage = new JQueryPage(page);
  const url = "https://the-internet.herokuapp.com/jqueryui/menu";
  const heading = /JQueryUI - Menu/i;
  // const list1 = ['Downloads','Back to JQuery UI'];
  // const list2 = ["PDF","CSV","Excel"];
  const expectedMenus = {
    enableLocator: ["Downloads", "Back to JQuery UI"],
    downloadLocator: ["PDF", "CSV", "Excel"],
  };

  const edgeCaseExpectedMenus = {
    pdfLocator: null,
    csvLocator: null,
    excelLocator: null,
  };

  await test.step("Navigate and verify heading", async () => {
    await jqueryPage.navigateJqueryPage(url);
    expect(await jqueryPage.getHeading()).toMatch(heading);
  });

  for (const [menu, sublist] of Object.entries(expectedMenus)) {
    await test.step(`menu ${menu} should show expected Submenus when the mouse hover on menu`, async () => {
      const getList = await jqueryPage.getHoverContentFromNextLevel(menu);
      expect(
        (await jqueryPage.isListContentExpected(getList, sublist)).overallResult
      ).toBeTruthy();
    });
  }

  // ✅ Verify that hidden menus are not visible before hover
  // ✅ Verify that menu collapses after moving away

  // ✅ Verify that there’s no unexpected menu item

  for (const [menu, submenuList] of Object.entries(edgeCaseExpectedMenus)) {
    await test.step(`${menu} should contain no submenus`, async () => {
      const getSubmenuList = await jqueryPage.getHoverContentFromNextLevel(
        menu
      );
      console.log(`the getSubmenuList is ${getSubmenuList}`);
      expect(
        (await jqueryPage.isListContentExpected(getSubmenuList, submenuList))
          .overallResult
      ).toBeTruthy();
    });
  }
});

//17:21 -
test("should react correctly for all javascript dialogue", async ({ page }) => {
  const url = "https://the-internet.herokuapp.com/javascript_alerts";
  const expectedText = {
    heading: /JavaScript Alerts/i,
    paragraph: /^Here are some examples of /i,
  };
  const expectedResult = {
    alert: [{ input: "", output: /You successfully clicked an alert/i }],
    confirm: [{input: "OK", output:/You clicked: Ok/i},{input: "Cancel",output: /You clicked: Cancel/i}],
    prompt: [{ input: "I am a tester", output: /I am a tester/i }],
  };
  const JSpage = new JavaDialogue(page);

  await test.step("navigate to the JS page", async () => {
    await JSpage.navigateToJavaPage(url);
  });

  for (const [title, content] of Object.entries(expectedText)) {
    await test.step(`The ${title} should contain expected content`, async () => {
      expect.soft(await JSpage.getTextContent(title)).toMatch(content);
    });
  }
  

  for (const [func, option] of Object.entries(expectedResult)) {
    await test.step(`The JS ${func} should react with expected result output`, async () => {
      for (let n = 0; n < option.length; n++) {
        await JSpage.dialogueAction(func, option[n].input);
        const result = await JSpage.getTextContent("result");
        expect.soft(result).toMatch(option[n].output);
      }page.waitForLoadState();
    });
  }
});


//14:55

test.skip('should return the correct status code for each page', async({page})=>{
   const statusCodePage = new statusCode(page);
   const url ='https://the-internet.herokuapp.com/status_codes';
   const expectContentMap ={
    heading: /Status Codes/i,
    paragraph: /^HTTP status codes are/i,
   }

   const expectedStatusCode = {
    200: 200,
    301: 200,
    404: 404,
    500: 500
   };

   await test.step('navigate to the status code page', async()=>{
    await statusCodePage.navigate(url);
   })

   for(const [title, content] of Object.entries(expectContentMap)){
    await test.step(`The ${title} should contain expected content`, async() => {
      expect.soft((await statusCodePage.getTextContent(title)).trimStart()).toMatch(content);
    })
   };

   for(const [linkName, expectedCode] of Object.entries(expectedStatusCode)){
    await test.step(`The status code for ${linkName} should be ${expectedCode}`, async() => {
      const statusCode = await statusCodePage.getClickCode(linkName,linkName);
      expect.soft(statusCode).toBe(expectedCode);
    });
   };
});

test('The API should return expected response for chat messages', async({request})=>{
  const ChatMessagePage = new ChatMessage(request);
  const baseURL = 'http://172.20.10.2:8000'

  await test.step('Get chat messages from API', async()=>{
    const apiUrl = `${baseURL}/chat-messages/`;
    const headers = {
      'Cache-Control': "no-cache",
      'Accept': "application/json",
      'Connection': 'keep-alive',
      'Accept-Encoding': 'gzip, deflate, br',
    };

    // const response = await request.get(apiUrl, {headers: headers});
    // const responseBody = await response.json();
    // console.log('Response Body:', responseBody);

    const response = await ChatMessagePage.getChatMessages(apiUrl,headers);
    console.log(`the response status is ${response.status()}`);
    expect.soft(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log('Response Body:', responseBody);

    expect(responseBody).toEqual(expect.arrayContaining([{avatar: 'E', name:'Elsa Zhang', last_message: 'Message 1'}]));
    for(const user of responseBody){
         expect.soft(user).toEqual(expect.objectContaining({avatar: expect.any(String),name: expect.any(String),last_message: expect.any(String)}));
    }; 

    await test.step('Should get all the Name List as expected', async()=>{
      const apiURL = `${baseURL}/reviews/`;
      const response = await ChatMessagePage.getChatMessages(apiURL,headers);
      expect.soft(response.status()).toBe(200);
      expect.soft(response.headers()['content-type']).toContain('application/json');
      const responseBody = await response.json();
      expect.soft(responseBody.length).toBeGreaterThan(0);
      console.log('Response Body:', responseBody);


      for(const user of responseBody){
        expect(user).toEqual(expect.objectContaining({
        person_name: expect.any(String),
        role: expect.any(String),
        avatar: expect.any(String),
        rating: expect.any(Number),
        review: expect.any(String),
      }));
      };

    });
  
  });



});