package com.ftn.sit.controller

import com.ftn.sit.model.dto.CreateCustomerDTO
import com.ftn.sit.model.dto.CreateSalesmanDTO
import com.ftn.sit.service.CustomerService
import com.ftn.sit.service.SalesmanService
import com.ftn.sit.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.validation.Valid

@RestController
class RegistrationController(
    private val salesmanService: SalesmanService,
    private val customerService: CustomerService
) {
   @PostMapping("/register-customer")
   fun registerCustomer(@Valid @RequestBody dto: CreateCustomerDTO, result: BindingResult): ResponseEntity<Any> {
       return if(result.hasErrors())
           ResponseEntity(
               mapOf("bindingResult" to result.allErrors),
               HttpStatus.BAD_REQUEST
           )
       else {
           customerService.saveCustomer(dto)
           ResponseEntity.ok(null)
       }
   }

    @PostMapping("/register-salesman")
    fun registerSalesman(@Valid @RequestBody dto: CreateSalesmanDTO, result: BindingResult): ResponseEntity<Any> {
        return if(result.hasErrors())
            ResponseEntity(
                mapOf("bindingResult" to result.allErrors),
                HttpStatus.BAD_REQUEST
            )
        else {
            salesmanService.saveSalesman(dto)
            ResponseEntity.ok(null)
        }
    }
}