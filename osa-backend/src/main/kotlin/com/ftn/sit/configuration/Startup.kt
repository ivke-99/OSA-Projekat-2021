package com.ftn.sit.configuration

import com.ftn.sit.model.*
import com.ftn.sit.repository.CustomerRepository
import com.ftn.sit.repository.OrderRepository
import com.ftn.sit.repository.SalesmanRepository
import com.ftn.sit.repository.UserRepository
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component
import java.time.LocalDateTime

@Component
class Startup(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val salesmanRepository: SalesmanRepository,
    private val customerRepository: CustomerRepository,
    private val orderRepository: OrderRepository
): ApplicationRunner {
    override fun run(args: ApplicationArguments?) {
        /*var user = User(
            id = 0, firstName = "Marko", surname = "Markovic", "marko123" ,"123456", active = true,
            roleList = mutableListOf(Role.CUSTOMER)
        ).apply { password = passwordEncoder.encode(password) }
        user = userRepository.save(user)
        var customer = Customer(
            user = user,
            address = "SomeAddress",
            orders = mutableListOf()
        )
        customer = customerRepository.save(customer)
        var order = Order(
            timeOfOrder = LocalDateTime.now(),
            isDelivered = true,
            grade = 4,
            comment = "It was beautiful doing business with this firm",
            isAnonComment = false,
            isArchivedComment = false,
            customer = customer,
            orderItemList = hashSetOf()
        )
        orderRepository.save(order)*/
        /*
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
        user2 = userRepository.save(user2)*/
    }
}