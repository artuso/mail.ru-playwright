const { I } = inject();

require('dotenv').config();

const defaultTimeout = 10;

const contentSelector = {css: `#box_layer`};

async function getPrettyCardSelectorByPosition(cardPosition){
  let numOfElements = await I.grabNumberOfVisibleElements({css: `${contentSelector.css} [class="pretty-card"]`});
  if( numOfElements > 1)
    return {css: `${contentSelector.css} [class*="pretty-card_transitions_on"]:nth-child(${cardPosition})`};
    else
      return {css: `${contentSelector.css} [class="pretty-cards__wrapper"] > [class*="pretty-card"]:nth-child(${cardPosition})`};
};

module.exports = {

  isVisible(){
    I.waitForVisible(contentSelector);
  },

  closeHelpPopupWithText(popupText){
    const popupSelector = {xpath: `//div[text()="${popupText}"]`};
    I.waitForVisible(popupSelector);
    I.click({xpath: `${popupSelector.xpath}/div[contains(@class, "hide")]`});
    I.waitForInvisible(popupSelector);
  },

  pressCreateButton(){
    const createButtonSelector = {css: '#send_post'};
    I.waitForVisible(createButtonSelector);
    I.click(createButtonSelector);
  },

  checkPostError(errorText){
    I.waitForText(errorText, defaultTimeout, {css: '#submit_post_error'});
  },

  addPrettyCard(link){
    const addCardButtonSelector = {css: '[class*="pretty-card_placeholder_yes"]'};
    const newCardUrlInputSelector = {css: '[class*="share_url_input"]'};
    const resumeButtonSelector = {xpath: '//table[@class="fl_r"]//button[text()="Продолжить"]'};

    I.waitForVisible(addCardButtonSelector);
    I.click(addCardButtonSelector);

    I.waitForVisible(newCardUrlInputSelector);
    I.fillField(newCardUrlInputSelector, link);

    I.click(resumeButtonSelector);
    I.waitForInvisible(newCardUrlInputSelector);
    I.wait(0.2);
  },

  async checkPrettyCardByPosition(cardPosition, link){
    const prettyCardSelector =  await getPrettyCardSelectorByPosition(cardPosition);

    await I.waitForVisible(prettyCardSelector);
    await I.waitForVisible({css: `${prettyCardSelector.css} [class*="action_remove"]`});
    await I.waitForText(link, defaultTimeout, {css: `${prettyCardSelector.css} [class="pretty-card__link-editor"]`});
  },

  async addFileToPrettyCard(cardPosition, fileName){
    const prettyCardSelector =  await getPrettyCardSelectorByPosition(cardPosition);
    const uploadFieldSelector = {css: `${prettyCardSelector.css} input[class="file"]`};

    await I.waitForVisible({css: `${prettyCardSelector.css} [class="pretty-card__upload-photo-button"]`});
    await I.attachFile(uploadFieldSelector, `data/${fileName}`);
    await I.waitForVisible({css: `${prettyCardSelector.css} [class="pretty-card__photo"][style*="url"]`});
  },

  async setPrettyCardTitle(cardPosition, titleText){
    const prettyCardSelector =  await getPrettyCardSelectorByPosition(cardPosition);
    const titleSelector = {css: `${prettyCardSelector.css} input[class*="pretty-card__title"]`};

    I.waitForVisible(titleSelector);
    I.click(titleSelector);
    I.fillField(titleSelector, titleText);
    I.click({css: '[class="box_title"]'});
    I.seeInField(titleSelector,titleText);
  }


  


  
};
