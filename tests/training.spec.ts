import {verifyBasicAuth} from '../pages/training-page';
import {test} from '../fixture/baiscAuthLogin';

test('verify login page of basic auth',async({authPage})=>{
    test.setTimeout(30_000);

    const auth = new verifyBasicAuth(authPage);
    const headingContent = 'Basic';
    const textContent = 'Congratulations';

    await auth.expectContentCorrect(headingContent,textContent);
    
})