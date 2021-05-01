package com.ftn.sit.model.dto

import com.ftn.sit.constraints.annotation.PasswordValueMatch
import com.ftn.sit.constraints.annotation.UniqueEmail
import com.ftn.sit.constraints.annotation.UniqueUsername
import com.ftn.sit.constraints.annotation.ValidPassword
import java.time.LocalDate
import javax.validation.constraints.Email
import javax.validation.constraints.NotBlank
import javax.validation.constraints.Past
import javax.validation.constraints.Size


@PasswordValueMatch.List(
    PasswordValueMatch(
        field = "password",
        fieldMatch = "passwordAgain",
        message = "Passwords do not match!"
    )
)
class CreateCustomerDTO (
    @field:NotBlank
    @field:Size(min = 2, max = 200)
    var firstName: String,

    @field:NotBlank
    @field:Size(min = 2, max = 200)
    var surname: String,

    @field:NotBlank
    @field:UniqueUsername(message = "Username already exists.")
    var username:String,

    @field:ValidPassword
    @field:NotBlank
    var password: String,


    @field:ValidPassword
    @field:NotBlank
    var passwordAgain: String,

    @field:NotBlank
    @field:Size(min = 1, max = 10)
    var addrNumber: String,

    @field:NotBlank
    @field:Size(min = 3, max = 40)
    var addrStreet: String,

    @field:NotBlank
    @field:Size(min = 3, max = 50)
    var addrCity: String,

    @field:NotBlank
    @field:Size(min = 3, max = 30)
    var addrCountry: String,
)

@PasswordValueMatch.List(
    PasswordValueMatch(
        field = "password",
        fieldMatch = "passwordAgain",
        message = "Passwords do not match!"
    )
)
class CreateSalesmanDTO(
    @field:NotBlank
    @field:Size(min = 2, max = 200)
    var firstName: String,

    @field:NotBlank
    @field:Size(min = 2, max = 200)
    var surname: String,

    @field:NotBlank
    @field:UniqueUsername(message = "Username already exists.")
    var username:String,

    @field:Email
    @field:UniqueEmail(message = "Account with provided E-mail already exists.")
    var email: String,

    @field:ValidPassword
    @field:NotBlank
    var password: String,

    @field:ValidPassword
    @field:NotBlank
    var passwordAgain: String,

    @field:NotBlank
    @field:Size(min = 1, max = 10)
    var addrNumber: String,

    @field:NotBlank
    @field:Size(min = 3, max = 40)
    var addrStreet: String,

    @field:NotBlank
    @field:Size(min = 3, max = 50)
    var addrCity: String,

    @field:NotBlank
    @field:Size(min = 3, max = 30)
    var addrCountry: String,

    @field:NotBlank
    @field:Size(min = 5, max = 30)
    var companyName: String,
)