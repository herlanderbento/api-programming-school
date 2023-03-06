import Notification from './notification'
describe('Unit tests for notifications', () => {
  it('should be able create errors', () => {
    const notification = new Notification();

    const error = {
      message: 'error message',
      context: 'userAdmin',      
    };

    notification.addError(error);

    expect(notification.messages('userAdmin')).toBe(
      'userAdmin: error message,'
    );

    const error2 = {
      message: 'error message2',
      context: 'teacher',
    };

    notification.addError(error2);

    expect(notification.messages()).toBe(
      'userAdmin: error message,teacher: error message2,'
    );
  });

  it('should check if notification has at least one error', () => {
    const notification = new Notification();

    const error = {
      message: 'error message',
      context: 'userAdmin',
    };

    notification.addError(error);

    expect(notification.hasErrors()).toBe(true);
  });

  it('should get all errors props', () => {
    const notification = new Notification();

    const error = {
      message: 'error message',
      context: 'teacher',
    };

    notification.addError(error);

    expect(notification.getErrors()).toEqual([error]);
  });
});
