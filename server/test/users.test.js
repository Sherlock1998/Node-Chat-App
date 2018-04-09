const expect = require('expect');
const { Users } = require('../utils/users');

describe('Users', () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Dev Room',
    }, {
      id: '2',
      name: 'Sam',
      room: 'Dev Room',
    }, {
      id: '3',
      name: 'Paul',
      room: 'Game Room',
    }];
  });

  it('Remove a user', () => {
    var userId = '1';
    var user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users).toHaveLength(2);
  });

  it('Not Remove a user', () => {
    var userId = '99';
    var user = users.removeUser(userId);
    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('Find a user', () => {
    const userId = '2';
    const user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });
  it('Not find a user', () => {
    var userId = '99';
    var user = users.getUser(userId);
    expect(user).toBeFalsy();
  });
  it('Add new user', () => {
    const users = new Users();
    const user = {
      id: 1234567,
      name: 'YJ',
      room: 1,
    };
    users.addUser(user.id, user.name, user.room);
    expect(users.users).toMatchObject([user]);
  });

  it('Get List of Users in Dev Room', () => {
    const usersList = users.getUsersList('Dev Room');
    expect(usersList).toEqual(['Mike', 'Sam']);
  });

  it('Get List of Users in Game Room', () => {
    const usersList = users.getUsersList('Game Room');
    expect(usersList).toEqual(['Paul']);
  });
});
