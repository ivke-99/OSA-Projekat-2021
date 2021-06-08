package com.ftn.sit.configuration

import com.ftn.sit.model.Role
import com.ftn.sit.model.Salesman
import com.ftn.sit.model.User
import com.ftn.sit.repository.SalesmanRepository
import com.ftn.sit.repository.UserRepository
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component

@Component
class Startup(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val salesmanRepository: SalesmanRepository
): ApplicationRunner {
    override fun run(args: ApplicationArguments?) {
        var user = User(
            id = 0, firstName = "Marko", surname = "Markovic", "marko123" ,"123456", active = true,
            roleList = mutableListOf(Role.SALESMAN)
        ).apply { password = passwordEncoder.encode(password) }
        user = userRepository.save(user)

        var salesman = Salesman(
            email = "email@email.com", address = "Neka akdresa 25", companyName = "neka kompanija",
            user = user
        )
        salesmanRepository.save(salesman)

        var user2 = User(
            id = 0, firstName = "Boki", surname = "Bokovic", "boki123" ,"123456", active = true,
            roleList = mutableListOf(Role.ADMIN)
        ).apply { password = passwordEncoder.encode(password) }
        user2 = userRepository.save(user2)

    }
}