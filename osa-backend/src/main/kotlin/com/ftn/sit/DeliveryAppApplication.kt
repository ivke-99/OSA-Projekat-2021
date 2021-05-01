package com.ftn.sit

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration
import org.springframework.boot.runApplication
import org.springframework.data.jpa.repository.config.EnableJpaRepositories

@SpringBootApplication
@EnableJpaRepositories
class DeliveryAppApplication

fun main(args: Array<String>) {
	runApplication<DeliveryAppApplication>(*args)
}
