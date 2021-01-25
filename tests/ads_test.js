Feature('Проверка картусели');

Before(({I, startPage}) => {
  startPage.logIn();
});


Scenario('Проверка добавления карусели и промежуточныйх сообщений об ошибках', async ({I, adsPage, adsBoxLayer}) => {
  adsPage.open();
  adsPage.setType('Карусель');
  adsPage.pressCreateButton();

  adsBoxLayer.isVisible();
  adsBoxLayer.closeHelpPopupWithText('Теперь сообщество можно выбрать здесь');

  adsBoxLayer.pressCreateButton();
  adsBoxLayer.checkPostError('Не прикреплена ни одна карточка.');

  const firstCardPosition = 1;
  const firstCardLink = 'vk.com/team';
  adsBoxLayer.addPrettyCard(firstCardLink);
  await adsBoxLayer.checkPrettyCardByPosition(firstCardPosition, firstCardLink);

  adsBoxLayer.pressCreateButton();
  adsBoxLayer.checkPostError('Для карточки необходимо загрузить изображение');

  await adsBoxLayer.addFileToPrettyCard(firstCardPosition, 'grom.jpg');

  adsBoxLayer.pressCreateButton();
  adsBoxLayer.checkPostError('Заголовок карточки должен быть не короче 3 символов.');

  await adsBoxLayer.setPrettyCardTitle(firstCardPosition, 'Первая карта');

  adsBoxLayer.pressCreateButton();
  adsBoxLayer.checkPostError('Невозможно создать скрытую запись. В записи может быть от 3 до 10 карточек.');

  const secondCardPosition = 2;
  const secondCardLink = 'vk.me/adsnews';
  adsBoxLayer.addPrettyCard(secondCardLink);
  await adsBoxLayer.checkPrettyCardByPosition(secondCardPosition, secondCardLink);
  await adsBoxLayer.addFileToPrettyCard(secondCardPosition, 'grom.jpg');
  await adsBoxLayer.setPrettyCardTitle(secondCardPosition, 'Вторая карта');

  const thirdCardPosition = 3;
  const thirdCardLink = 'wikipedia.org';
  adsBoxLayer.addPrettyCard(thirdCardLink);
  await adsBoxLayer.checkPrettyCardByPosition(thirdCardPosition, thirdCardLink);
  await adsBoxLayer.addFileToPrettyCard(thirdCardPosition, 'grom.jpg');
  await adsBoxLayer.setPrettyCardTitle(thirdCardPosition, 'Третья карта');

  adsBoxLayer.pressCreateButton();

  adsPage.checkPostPreview();
});
