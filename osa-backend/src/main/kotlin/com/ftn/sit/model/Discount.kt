package com.ftn.sit.model

import java.time.LocalDate
import javax.persistence.*


@Entity
@Table(name = "discounts")
class Discount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "discount_id", unique = true, nullable = false)
    private val id: Int? = null

    @Column(nullable = false)
    private val percentage: Int? = null

    @Column(name = "start_date", nullable = false)
    private val startDate: LocalDate? = null

    @Column(name = "end_date", nullable = false)
    private val endDate: LocalDate? = null
    private val description: String? = null

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "salesman_id", nullable = false)
    private val salesman: Salesman? = null
}