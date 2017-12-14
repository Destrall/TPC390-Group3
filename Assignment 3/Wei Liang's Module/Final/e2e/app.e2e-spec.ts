import { Angular2SchedulerEditDialogPage } from './app.po';

describe('angular2-scheduler-edit-dialog App', function() {
  let page: Angular2SchedulerEditDialogPage;

  beforeEach(() => {
    page = new Angular2SchedulerEditDialogPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
