package com.ftn.sit.service

import com.ftn.sit.model.Customer
import com.ftn.sit.model.Role
import com.ftn.sit.model.User
import com.ftn.sit.model.dto.CreateCustomerDTO
import com.ftn.sit.repository.CustomerRepository
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class CustomerService(
    private val customerRepository: CustomerRepository,
    private val paEc: PasswordEncoder
) {
    fun saveCustomer(dto: CreateCustomerDTO) {
        val customer = Customer(
            id = 0,
            user = User(
                id = 0,
                firstName = dto.firstName,
                surname = dto.surname,
                username = dto.username,
                password = paEc.encode(dto.password),
                active = true,
                roleList = mutableListOf(Role.CUSTOMER),
            ),
            address = "${dto.addrNumber} ${dto.addrStreet} ${dto.addrCity} ${dto.addrCountry}"
        )
        customerRepository.save(customer);
    }
}