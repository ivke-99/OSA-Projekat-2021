package com.ftn.sit.model

import java.util.HashSet
import javax.persistence.*


@Entity
@Table(name = "customers")
class Customer (
    @OneToOne(cascade = [CascadeType.PERSIST, CascadeType.MERGE])
    @JoinColumn(name = "user_id")
    @MapsId
    var user: User,
    var address: String,
    @OneToMany(cascade = [CascadeType.ALL], fetch = FetchType.LAZY, mappedBy = "customer")
    var orders: MutableList<Order> = mutableListOf()
)
{
    @Id
    var id: Long = user.id
}