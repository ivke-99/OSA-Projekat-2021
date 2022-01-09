package com.ftn.sit.model

import java.util.HashSet

import java.time.LocalDate
import java.time.LocalDateTime
import javax.persistence.*


@Entity
@Table(name = "orders")
class Order(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "order_id", unique = true, nullable = false)
    var id: Long = 0,

    @Column(nullable = false)
    var timeOfOrder: LocalDateTime = LocalDateTime.now(),

    @Column(nullable = false)
    var isDelivered: Boolean? = null,

    @Column(nullable = false)
    var grade: Int? = null,

    @Column(nullable = true)
    var comment: String? = null,

    @Column(nullable = true)
    var isAnonComment: Boolean = false,

    @Column(nullable = true)
    var isArchivedComment: Boolean? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    var customer: Customer,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "salesman_id", nullable = false)
    var salesman: Salesman,

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "order")
    var orderItemList: Set<OrderItem> = HashSet()
)