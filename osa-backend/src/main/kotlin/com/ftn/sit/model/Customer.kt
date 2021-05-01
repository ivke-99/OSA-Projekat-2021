package com.ftn.sit.model

import java.util.HashSet
import javax.persistence.*


@Entity
@Table(name = "customers")
class Customer (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id", unique = true, nullable = false)
    var id: Long?,
    @OneToOne(cascade = [CascadeType.PERSIST, CascadeType.MERGE])
    @JoinColumn(name = "user_id")
    @MapsId
    var user: User?,
    var address: String?,
    @OneToMany(cascade = [CascadeType.ALL], fetch = FetchType.LAZY, mappedBy = "customer")
    var orders: MutableList<Order> = mutableListOf()
)
