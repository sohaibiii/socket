class User {
  constructor () {
    this.users = []
  }

  adduser (id, name, room) {
    var user = {
      id,
      name,
      room
    }
    this.users.push(user)

    return user
  }
  getuser (id) {
    var user = this.users.filter(user => user.id == id)[0]
    return user
  }
  removeuser (id) {
    var user = this.getuser(id)
    if (user) {
      this.users = this.users.filter(user => user.id !== id).slice()
    }
    return user
  }
  getuserslist (room) {
    var users = this.users.filter(user => user.room === room)
    var list = users.map(user => user.name)
    return list
  }
}

module.exports = {
  User
}
