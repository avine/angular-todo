import { AngularTodoPage } from './app.po';

describe('angular-todo App', () => {
  let page: AngularTodoPage;

  beforeEach(() => {
    page = new AngularTodoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
