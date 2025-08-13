export class User {
  constructor ({
    user_id = null,
    fullname,
    email,
    username,
    passwordHash = null,
    active = true,
    country,
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    this.user_id = user_id
    this.fullname = fullname
    this.email = email
    this.username = username
    this._passwordHash = passwordHash
    this.active = Boolean(active)
    this.country = country
    this.createdAt = new Date(createdAt)
    this.updatedAt = new Date(updatedAt)
  }

  static create ({
    fullname,
    email,
    username,
    passwordHash,
    country
  }) {
    return new User({
      fullname,
      email,
      username,
      passwordHash,
      country,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  rename (newFullName) {
    this.fullname = newFullName
  }

  changeUserName (newUserName) {
    this.username = newUserName
  }

  changeEmail (newEmail) {
    this.email = newEmail
  }

  setPasswordHash (newHash) {
    this._passwordHash = newHash
  }

  activate () { this.active = true }
  desactivate () { this.active = false }

  toObjectSafe () {
    return {
      user_id: this.user_id,
      fullname: this.fullname,
      email: this.email,
      username: this.username,
      active: this.active,
      country: this.country,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
