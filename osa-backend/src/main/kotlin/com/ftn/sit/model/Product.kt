package com.ftn.sit.model

import java.util.HashSet
import javax.persistence.*


@Entity
@Table(name = "products")
class Product (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id", unique = true, nullable = false)
    var id: Long = 0,
    @Column(name = "product_name", nullable = false)
    var name: String,
    @Column(name = "product_price", nullable = false)
    var price: Double,
    @Column(name = "product_description", nullable = false)
    var description: String,
    @Column(name = "product_image", nullable = false)
    var productImage: String,
    @OneToMany(cascade = [CascadeType.ALL])
    var orderItems: MutableList<OrderItem> = mutableListOf(),
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "salesman_id", nullable = false)
    var salesman: Salesman,
)