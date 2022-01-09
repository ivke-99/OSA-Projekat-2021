package com.ftn.sit.repository

import com.ftn.sit.model.Order
import org.springframework.data.jpa.repository.JpaRepository

interface OrderRepository: JpaRepository<Order, Long> {
    fun findAllBySalesmanId(salesmanId: Long) : MutableList<Order>
    fun findAllByIdIn(idList: MutableList<Long>) : MutableList<Order>
}