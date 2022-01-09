package com.ftn.sit.service

import com.ftn.sit.model.dto.ViewOrderDTO
import com.ftn.sit.repository.OrderESRepository
import com.ftn.sit.repository.OrderRepository
import com.ftn.sit.repository.UserRepository
import org.springframework.stereotype.Service
import java.security.Principal

@Service
class OrderService(
    private val orderESRepository: OrderESRepository,
    private val orderRepository: OrderRepository,
    private val userService: UserService
) {
    fun findAllBySalesman(name: String): List<ViewOrderDTO> {
        val user = userService.findUserByUsername(name)!!
        val orders = orderRepository.findAllBySalesmanId(user.id)
        return orders.map {
            ViewOrderDTO(it)
        }
    }

    fun findAllBySearchTerm(searchTerm: String, principal: Principal): List<ViewOrderDTO> {
        val user = userService.findUserByUsername(principal.name)!!
        val esOrders = orderESRepository.findAllBySalesmanIdAndCommentLike(user.id, searchTerm)
        val idList = mutableListOf<Long>()
        for (order in esOrders) {
            idList.add(order.id)
        }
        val orders = orderRepository.findAllByIdIn(idList)
        return orders.map {
            ViewOrderDTO(it)
        }
    }
}