const { I } = inject();

require('dotenv').config();

const defaultTimeout = 10;

module.exports = {


  logIn(){
    const host = process.env.MAIN_URL;
    const loginFormSelector = {css: `#index_login`};

    I.amOnPage(host);

    I.waitForVisible(loginFormSelector);
    within(loginFormSelector, () =>{
      I.fillField({css: `#index_email`}, process.env.LOGIN);
      I.fillField({css: `#index_pass`}, secret(process.env.PASSWORD));
      I.click({css: `#index_login_button`});
    });
    I.waitForInvisible(loginFormSelector);
    I.waitInUrl(`${host}feed`);
  }

  


  
};
