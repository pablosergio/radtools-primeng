import { RadtoolsPrimengPage } from './app.po';

describe('radtools-primeng App', function() {
  let page: RadtoolsPrimengPage;

  beforeEach(() => {
    page = new RadtoolsPrimengPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
