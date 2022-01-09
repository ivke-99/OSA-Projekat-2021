package com.ftn.sit.model

import java.util.HashSet

import java.time.LocalDate
import java.time.LocalDateTime
import javax.persistence.*


@Entity
@Table(name = "orders")
class Order(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id", unique = true, nullable = false)
    var id: Int? = null,

    @Column(nullable = false)
    var timeOfOrder: LocalDateTime,

    @Column(nullable = false)
    var isDelivered: Boolean? = null,

    @Column(nullable = false)
    var grade: Int? = null,

    @Column(nullable = true)
    var comment: String? = null,

    @Column(nullable = true)
    var isAnonComment: Boolean? = null,

    @Column(nullable = true)
    var isArchivedComment: Boolean? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    var customer: Customer? = null,

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "order")
    var orderItemList: Set<OrderItem> = HashSet()
)