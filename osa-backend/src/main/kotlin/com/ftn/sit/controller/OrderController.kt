package com.ftn.sit.controller

import com.ftn.sit.service.OrderService
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.security.Principal

@RestController
@RequestMapping("/orders")
class OrderController(
    private val orderService: OrderService
) {
    @GetMapping("/comments")
    @PreAuthorize("hasAuthority('SALESMAN')")
    fun fetchSalesmanComments(
        @RequestParam(required = false, defaultValue = "") searchTerm: String,
        principal: Principal
    ): ResponseEntity<Any> {
        if (searchTerm.isNotBlank()) {
            val salesmanESComments = orderService.findAllBySearchTerm(searchTerm, principal)
            return ResponseEntity.ok(salesmanESComments)
        }
        val salesmanComments = orderService.findAllBySalesman(principal.name)
        return ResponseEntity.ok(salesmanComments)
    }
}