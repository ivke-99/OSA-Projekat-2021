package com.ftn.sit.repository

import com.ftn.sit.model.Customer
import com.ftn.sit.model.Salesman
import org.springframework.data.jpa.repository.JpaRepository

interface CustomerRepository: JpaRepository<Customer, Long> {
}