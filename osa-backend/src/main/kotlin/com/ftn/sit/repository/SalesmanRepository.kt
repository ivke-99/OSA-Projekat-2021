package com.ftn.sit.repository

import com.ftn.sit.model.Salesman
import com.ftn.sit.model.User
import org.springframework.data.jpa.repository.JpaRepository

interface SalesmanRepository: JpaRepository<Salesman, Long> {
    fun findSalesmanByEmail(email: String) : Salesman?
    fun findSalesmanByUser(user: User) : Salesman
}