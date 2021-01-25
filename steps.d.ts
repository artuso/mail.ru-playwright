/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type adsBoxLayer = typeof import('./pages/adsBoxLayer.js');
type startPage = typeof import('./pages/startPage.js');
type adsPage = typeof import('./pages/adsPage.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, adsBoxLayer: adsBoxLayer, startPage: startPage, adsPage: adsPage }
  interface Methods extends Playwright {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
