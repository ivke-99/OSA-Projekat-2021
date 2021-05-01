package com.ftn.sit.model.dto

import javax.validation.constraints.DecimalMax
import javax.validation.constraints.DecimalMin
import javax.validation.constraints.NotBlank
import javax.validation.constraints.Size

class CreateProductDTO (
    @field:NotBlank
    @field:Size(min = 3, max = 10)
    var productName: String,
    @DecimalMax(value = "500.00")
    @DecimalMin(value = "10.00")
    var price: Double,
    @field:NotBlank
    @field:Size(min = 3, max = 50)
    var description: String,
    )
