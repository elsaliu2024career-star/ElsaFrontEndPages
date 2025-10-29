import {verifyBasicAuth} from '../pages/VerifyBasicAuth';
import {addRemovePage} from '../pages/ManualAddRm';
import {VerifyBrokenPage} from '../pages/BrokenImages';
import { test } from '../fixture/baiscAuthLogin';


test('verify login page of basic auth',async({authPage})=>{
    test.setTimeout(30_000);
    const auth = new verifyBasicAuth(authPage);
    const headingContent = /Basic Auth/i;
    const textContent = /Congratulations/i;
    await auth.expectContentCorrect(headingContent,textContent);    
})

test('verify the manual add/remove button', async({page})=>{
    test.setTimeout(30_000);
    const manual = new addRemovePage(page);
    const url = 'https://the-internet.herokuapp.com/add_remove_elements/';
    const heading = 'Add/Remove Elements';
    await manual.navigateAndVerifyPageContent(url,heading);
    await manual.verifyAddDeleteButton(3);
});

test('verify Broken Images', async({page})=>{
    const verifyBrokenImages = new VerifyBrokenPage(page);
    await verifyBrokenImages.NavigateAndVerifyHeading('https://the-internet.herokuapp.com/broken_images','Broken Images');
    await verifyBrokenImages.VerifyImage();
});