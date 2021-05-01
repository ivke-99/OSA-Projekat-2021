package com.ftn.sit.constraints.validator

import com.ftn.sit.constraints.annotation.UniqueEmail
import com.ftn.sit.service.SalesmanService
import javax.validation.ConstraintValidator
import javax.validation.ConstraintValidatorContext

class UniqueEmailValidator(
    private val salesmanService: SalesmanService
) : ConstraintValidator<UniqueEmail, String> {
    override fun isValid(value: String, context: ConstraintValidatorContext?): Boolean =
        !salesmanService.doesSalesmanEmailExist(value)
}