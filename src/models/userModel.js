class User {
  constructor({ name, surname, email, username, password, _id }) {
    this._id = _id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.username = username;
    this.password = password;
  }
}

module.exports = User;
