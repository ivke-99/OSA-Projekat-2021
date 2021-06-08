package com.ftn.sit.model

import java.time.LocalDate
import javax.persistence.*


@Entity
@Table(name = "discounts")
class Discount (
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "discount_id", unique = true, nullable = false)
    var id: Long = 0,
    @Column(nullable = false)
    var percentage: Int,
    @Column(name = "start_date", nullable = false)
    var startDate: LocalDate,
    @Column(name = "end_date", nullable = false)
    var endDate: LocalDate,
    var description: String,
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "salesman_id", nullable = false)
    var salesman: Salesman
)