const { I } = inject();

require('dotenv').config();

const defaultTimeout = 10;

const contentSelector = {css: `#ads_office_content_page`};

const adsType = {
  'Карусель': {css: `[subvalue*="pretty_cards"]`}
};

module.exports = {

  open(){
    I.amOnPage(`${process.env.MAIN_URL}ads`);
    I.waitInUrl('/adscreate');
    this.isVisible();
  },

  isVisible(){
    I.waitForVisible(contentSelector);
  },


  setType(adsName){
    const adsTypeSelector = adsType[adsName];
    within(contentSelector, () =>{
      I.waitForVisible(adsTypeSelector);
      I.click(adsTypeSelector);
      I.waitForVisible({css: `${adsTypeSelector.css}[class*=selected]`});
    });
  },

  pressCreateButton(){
    const createButtonSelector = {css: '#ads_param_post_create_post'};
    I.waitForVisible(createButtonSelector);
    I.click(createButtonSelector);
  },

  checkPostPreview(){
    within(contentSelector, () =>{
      I.waitForVisible({css: '[class*="_post_content"]'});

    });
  }

  


  
};
