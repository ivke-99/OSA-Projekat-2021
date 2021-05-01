package com.ftn.sit.service

import com.ftn.sit.model.Customer
import com.ftn.sit.model.Role
import com.ftn.sit.model.Salesman
import com.ftn.sit.model.User
import com.ftn.sit.model.dto.CreateSalesmanDTO
import com.ftn.sit.repository.SalesmanRepository
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class SalesmanService(
    private val salesmanRepository: SalesmanRepository,
    private val paEc: PasswordEncoder
) {
    fun findSalesmanByEmail(email: String) = salesmanRepository.findSalesmanByEmail(email)
    fun findSalesmanByUser(user: User) = salesmanRepository.findSalesmanByUser(user)
    fun doesSalesmanEmailExist(email: String) = findSalesmanByEmail(email) != null
    fun saveSalesman(dto: CreateSalesmanDTO) {
        val salesman = Salesman(
            id = 0,
            user = User(
                id = 0,
                firstName = dto.firstName,
                surname = dto.surname,
                username = dto.username,
                password = paEc.encode(dto.password),
                active = true,
                roleList = mutableListOf(Role.SALESMAN),
            ),
            address = dto.addrNumber + " " + dto.addrStreet + " " + dto.addrCity + " " + dto.addrCountry,
            email = dto.email,
            companyName = dto.companyName
        )
        salesmanRepository.save(salesman);
    }
}