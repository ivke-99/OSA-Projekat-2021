package com.ftn.sit.model

import java.util.HashSet

import java.time.LocalDate
import javax.persistence.*


@Entity
@Table(name = "orders")
class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id", unique = true, nullable = false)
    private val id: Int? = null

    @Column(nullable = false)
    private val timeOfOrder: LocalDate? = null

    @Column(nullable = false)
    private val isDelivered: Boolean? = null

    @Column(nullable = false)
    private val grade: Int? = null

    @Column(nullable = true)
    private val comment: String? = null

    @Column(nullable = true)
    private val isAnonComment: Boolean? = null

    @Column(nullable = true)
    private val isArchivedComment: Boolean? = null

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private val customer: Customer? = null

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "order")
    private val orderItemList: Set<OrderItem> = HashSet()
}