package com.ftn.sit.model.dto

import com.ftn.sit.model.User

class UserViewDTO(
    val firstName: String,
    val surname: String,
    val username: String,
) {
    constructor(user: User) : this(user.firstName, user.surname, user.username)
}