package com.ftn.sit.model

import java.util.HashSet

import java.time.LocalDate
import javax.persistence.*


@Entity
@Table(name = "salesman")
class Salesman (
    @OneToOne(cascade = [CascadeType.PERSIST, CascadeType.MERGE])
    @JoinColumn(name = "user_id")
    @MapsId
    var user: User,
    @Column(name = "registration_date", nullable = false)
    var registrationDate: LocalDate = LocalDate.now(),
    @Column(nullable = false)
    var email: String,
    @Column(nullable = false)
    var address: String,
    @Column(name = "company_name", nullable = false)
    var companyName: String,
    @OneToMany(cascade = [CascadeType.ALL], fetch = FetchType.LAZY, mappedBy = "salesman")
    var products: MutableList<Product> = mutableListOf(),
    @OneToMany(cascade = [CascadeType.ALL], fetch = FetchType.LAZY, mappedBy = "salesman")
    var discounts: MutableList<Discount> = mutableListOf()
)
{
    @Id
    var id: Long = user.id
}