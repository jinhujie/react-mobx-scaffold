function resolve(fileName) {
    const prefix = __DEV
        ? '/staticQRM/image/' : 
        'https://asset.tuwan.com/activity/qq-race-comp/staticQRM/image';
    return prefix + fileName;
}

export const bg = resolve('bg.jpg');
export const signupTitle = resolve('sectionSignup.png');
export const signupFormBg = resolve('signupFormBg.png');
export const signupFormInput = resolve('signupFormInput.png');
export const signupSubmit = resolve('signupSubmit.png');
export const matchRule = resolve('matchRule.png');
export const rewardBg = resolve('rewardBg.png');
export const rewardFinalTitle = resolve('rewardFinalTitle.png');
export const extralSummary = resolve('extralSummary.png');
export const joinQqCommuBtn = resolve('joinQqCommuBtn.png');