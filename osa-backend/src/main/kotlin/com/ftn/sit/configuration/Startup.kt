package com.ftn.sit.configuration

import com.ftn.sit.model.*
import com.ftn.sit.model.elastic.OrderES
import com.ftn.sit.repository.*
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
    private val orderRepository: OrderRepository,
    private val orderESRepository: OrderESRepository,
): ApplicationRunner {
    override fun run(args: ApplicationArguments?) {
        /*
        var admin = User(
            id = 0, firstName = "Zelena", surname = "Buric", "zelena" ,"123456", active = true,
            roleList = mutableListOf(Role.ADMIN)
        ).apply { password = passwordEncoder.encode(password) }
        userRepository.save(admin)

        var user = User(
            id = 0, firstName = "Boris", surname = "Gunovic", "boris123" ,"123456", active = true,
            roleList = mutableListOf(Role.CUSTOMER)
        ).apply { password = passwordEncoder.encode(password) }

        user = userRepository.save(user)
        var customer = Customer(
            user = user,
            address = "SomeAddress",
            orders = mutableListOf()
        )
        customer = customerRepository.save(customer)

        var user2 = User(
            id = 0, firstName = "Ivan", surname = "Djuraki", "ivke" ,"123456", active = true,
            roleList = mutableListOf(Role.SALESMAN)
        ).apply { password = passwordEncoder.encode(password) }
        var salesman = Salesman(
            user = user2,
            email = "email@email.com",
            address = "Adresa 231",
            companyName = "Neka kompanija"
        )
        salesmanRepository.save(salesman)
        var salesmanOBJECT = salesmanRepository.findSalesmanByEmail("email@email.com")

        var order = Order(
            timeOfOrder = LocalDateTime.now(),
            isDelivered = true,
            grade = 4,
            comment = "It was beautiful doing business with this firm",
            isAnonComment = false,
            isArchivedComment = false,
            customer = customer,
            salesman = salesmanOBJECT!!,
            orderItemList = hashSetOf()
        )
        var order2 = Order(
            timeOfOrder = LocalDateTime.now(),
            isDelivered = true,
            grade = 4,
            comment = "Lorem Ipsum је једноставно модел текста који се користи у штампарској и словослагачкој индустрији.",
            isAnonComment = true,
            isArchivedComment = false,
            customer = customer,
            salesman = salesmanOBJECT,
            orderItemList = hashSetOf()
        )
        var order3 = Order(
            timeOfOrder = LocalDateTime.now(),
            isDelivered = true,
            grade = 4,
            comment = "Ovaj tekst napisan na latinskom jeziku, ili bar njegove dve početne reči poznate su štamparima...",
            isAnonComment = true,
            isArchivedComment = false,
            customer = customer,
            salesman = salesmanOBJECT,
            orderItemList = hashSetOf()
        )
        var order4 = Order(
            timeOfOrder = LocalDateTime.now(),
            isDelivered = true,
            grade = 4,
            comment = "Umesto da koristi tekst koji, na primer, glasi “Proba, proba, proba…” ili “Ovo je mesto za tekst, ovo..",
            isAnonComment = true,
            isArchivedComment = false,
            customer = customer,
            salesman = salesmanOBJECT,
            orderItemList = hashSetOf()
        )
        var order5 = Order(
            timeOfOrder = LocalDateTime.now(),
            isDelivered = true,
            grade = 3,
            comment = "То значи да овде генерисани Lorem Ipsum не садржи понављање, нема убачен хумор или неке неочекиване речи и тако даље",
            isAnonComment = false,
            isArchivedComment = false,
            customer = customer,
            salesman = salesmanOBJECT,
            orderItemList = hashSetOf()
        )
        var order6 = Order(
            timeOfOrder = LocalDateTime.now(),
            isDelivered = true,
            grade = 5,
            comment = "Moram vam objasniti kako je rođena čitava ova pogrešna ideja kojom se osuđuje zadovoljstvo i veliča bol...",
            isAnonComment = false,
            isArchivedComment = false,
            customer = customer,
            salesman = salesmanOBJECT,
            orderItemList = hashSetOf()
        )

        orderRepository.save(order)
        orderRepository.save(order2)
        orderRepository.save(order3)
        orderRepository.save(order4)
        orderRepository.save(order5)
        orderRepository.save(order6)

        var esOrder = OrderES(
            id = order.id,
            salesmanId = salesmanOBJECT.id,
            comment = order.comment ?: "",
        )
        var esOrder2 = OrderES(
            id = order2.id,
            salesmanId = salesmanOBJECT.id,
            comment = order2.comment ?: "",
        )
        var esOrder3 = OrderES(
            id = order3.id,
            salesmanId = salesmanOBJECT.id,
            comment = order3.comment ?: "",
        )
        var esOrder4 = OrderES(
            id = order4.id,
            salesmanId = salesmanOBJECT.id,
            comment = order4.comment ?: "",
        )
        var esOrder5 = OrderES(
            id = order5.id,
            salesmanId = salesmanOBJECT.id,
            comment = order5.comment ?: "",
        )
        var esOrder6 = OrderES(
            id = order6.id,
            salesmanId = salesmanOBJECT.id,
            comment = order6.comment ?: "",
        )
        orderESRepository.save(esOrder)
        orderESRepository.save(esOrder2)
        orderESRepository.save(esOrder3)
        orderESRepository.save(esOrder4)
        orderESRepository.save(esOrder5)
        orderESRepository.save(esOrder6)
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
   */ }
}