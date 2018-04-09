
class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    const user = { id, name, room };
    this.users.push(user);
  }

  removeUser(id) {
    const user = this.getUser(id);
    if (user) {
      this.users = this.users.filter(user => user.id !== id);
    }
    return user;
  }

  getUser(id) {
    return this.users.filter(user => user.id === id)[0];
  }
  getUsersList(room) {
    const users = this.users.filter(user => user.room === room);
    const usersArray = users.map(user => user.name);
    return usersArray;
  }
}

module.exports = { Users };
