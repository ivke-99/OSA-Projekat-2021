package com.ftn.sit.service

import com.ftn.sit.model.dto.ViewOrderDTO
import com.ftn.sit.repository.OrderESRepository
import com.ftn.sit.repository.OrderRepository
import org.apache.lucene.search.join.ScoreMode
import org.elasticsearch.index.query.QueryBuilder
import org.elasticsearch.index.query.QueryBuilders
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder
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
        val esOrders = orderESRepository.findAllBySalesmanIdAndCommentLike(user.id, searchTerm.replace(" ", "%20"))
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