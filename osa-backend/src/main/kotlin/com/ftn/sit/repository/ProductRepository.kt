package com.ftn.sit.repository

import com.ftn.sit.model.Product
import com.ftn.sit.model.Salesman
import org.springframework.data.jpa.repository.JpaRepository

interface ProductRepository: JpaRepository<Product, Long> {
    fun findByNameAndSalesman(name: String, salesman: Salesman) : Product?
    fun findByNameAndSalesmanUserUsername(name: String,username: String) : Product?
    fun findAllBySalesmanUserUsername(name: String) : MutableList<Product>
    fun findAllByIdIn(idList: MutableList<Long>) : MutableList<Product>
}