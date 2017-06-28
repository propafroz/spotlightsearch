import { TypeaheadSearchPage } from './app.po';

describe('typeahead-search App', () => {
  let page: TypeaheadSearchPage;

  beforeEach(() => {
    page = new TypeaheadSearchPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
