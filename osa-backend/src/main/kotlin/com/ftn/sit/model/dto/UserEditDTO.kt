package com.ftn.sit.model.dto

import javax.validation.constraints.NotBlank
import javax.validation.constraints.Size

class UserEditDTO(
    @field:NotBlank(message = "First name cannot be empty.")
    @field:Size(min = 2, max = 30, message = "First name must be between 2 and 200 characters.")
    val firstName: String,
    @field:NotBlank(message = "Last name cannot be empty.")
    @field:Size(min = 2, max = 30, message = "Last name must be between 2 and 200 characters.")
    val surname: String,
)