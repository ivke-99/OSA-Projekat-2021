package com.ftn.sit.model.dto

import com.ftn.sit.constraints.annotation.PasswordValueMatch
import com.ftn.sit.constraints.annotation.ValidPassword
import javax.validation.constraints.NotBlank

@PasswordValueMatch.List(
    PasswordValueMatch(
        field = "password",
        fieldMatch = "passwordAgain",
        message = "Passwords do not match!"
    )
)
class UserPasswordEditDTO(
    @field:NotBlank
    val oldPassword: String,
    @field:ValidPassword(message = "Password is invalid.")
    @field:NotBlank
    val password: String,
    @field:ValidPassword(message = "Passwords must match.")
    @field:NotBlank
    val passwordAgain: String,
)