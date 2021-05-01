package com.ftn.sit.constraints.validator

import com.ftn.sit.constraints.annotation.UniqueUsername
import com.ftn.sit.service.UserService
import javax.validation.ConstraintValidator
import javax.validation.ConstraintValidatorContext

class UniqueUsernameValidator(
    private val userService: UserService
) : ConstraintValidator<UniqueUsername, String> {
    override fun isValid(value: String, context: ConstraintValidatorContext?): Boolean =
        !userService.doesUsernameExist(value)
}