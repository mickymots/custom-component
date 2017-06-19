import { CustomComponentsPage } from './app.po';

describe('custom-components App', () => {
  let page: CustomComponentsPage;

  beforeEach(() => {
    page = new CustomComponentsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
