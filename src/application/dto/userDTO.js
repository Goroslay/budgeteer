class UserDTO {
  _normalizeFullname (name) {
    return name?.trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  _normalizeEmail (email) {
    return email?.toLowerCase().trim()
  }

  _normalizeUsername (username) {
    return username?.toLowerCase().trim()
  }

  _normalizeCountry (country) {
    return country?.trim().toUpperCase()
  }
}

export class RegisterUserDTO extends UserDTO {
  constructor ({
    fullname,
    username,
    email,
    country,
    password
  }) {
    super()
    this.fullname = this._normalizeFullname(fullname)
    this.username = this._normalizeUsername(username)
    this.email = this._normalizeEmail(email)
    this.country = this._normalizeCountry(country)
    this.password = password
    Object.freeze(this)
  }

  static fromObject (object = {}) {
    const { fullname, username, email, country, password } = object
    return new RegisterUserDTO({ fullname, username, email, country, password })
  }

  toDomain () {
    return {
      fullname: this.fullname,
      username: this.username,
      email: this.email,
      country: this.country,
      password: this.password
    }
  }
}

export class LoginUserDTO extends UserDTO {
  constructor ({ username = undefined, email = undefined, password }) {
    super()
    this.username = username ? this._normalizeUsername(username) : undefined
    this.email = email ? this._normalizeEmail(email) : undefined
    this.password = password
    Object.freeze(this)
  }

  static fromObject (object = {}) {
    const { username, email, password } = object
    return new LoginUserDTO({ username, email, password })
  }

  toDomain () {
    const domain = {}
    if (this.username !== undefined) domain.username = this.username
    if (this.email !== undefined) domain.email = this.email
    domain.password = this.password

    return domain
  }
}

export class UpdateMeDTO extends UserDTO {
  constructor ({
    token,
    username = undefined,
    fullname = undefined,
    country = undefined,
    email = undefined
  }) {
    super()
    this.token = token
    this.username = username ? this._normalizeUsername(username) : undefined
    this.fullname = fullname ? this._normalizeFullname(fullname) : undefined
    this.country = country ? this._normalizeCountry(country) : undefined
    this.email = email ? this._normalizeEmail(email) : undefined
    Object.freeze(this)
  }

  static fromObject (object = {}) {
    const { token, username, fullname, country, email } = object
    return new UpdateMeDTO({ token, username, fullname, country, email })
  }

  toDomain () {
    const domain = {}
    domain.token = this.token
    if (this.username !== undefined) domain.username = this.username
    if (this.fullname !== undefined) domain.fullname = this.fullname
    if (this.country !== undefined) domain.country = this.country
    if (this.email !== undefined) domain.email = this.email
    return domain
  }
}

export class ListUserDTO extends UserDTO {
  constructor ({
    id,
    fullname,
    username,
    email,
    country,
    active,
    take,
    skip
  } = {}) {
    super()
    this.user_id = id
    this.fullname = fullname ? this._normalizeFullname(fullname) : undefined
    this.username = username ? this._normalizeUsername(username) : undefined
    this.email = email ? this._normalizeEmail(email) : undefined
    this.country = country ? this._normalizeCountry(country) : undefined
    this.active = active !== undefined ? active : undefined
    this.take = take ? Number(take) : undefined
    this.skip = skip ? Number(skip) : undefined
    Object.freeze(this)
  }

  static fromQuery (object = {}) {
    const { id, fullname, username, email, country, active, take, skip } = object
    return new ListUserDTO({ id, fullname, username, email, country, active, take, skip })
  }

  toDomain () {
    const where = {}
    if (this.user_id !== undefined) where.user_id = this.user_id
    if (this.fullname !== undefined) where.fullname = this.fullname
    if (this.username !== undefined) where.username = this.username
    if (this.email !== undefined) where.email = this.email
    if (this.country !== undefined) where.country = this.country
    if (this.active !== undefined) where.active = this.active
    const domain = { where }
    if (this.take !== undefined) domain.take = this.take
    if (this.skip !== undefined) domain.skip = this.skip
    return domain
  }
}
