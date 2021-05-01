package com.ftn.sit.model

import javax.persistence.*


@Entity
@Table(name = "administrators")
class Administrator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id", unique = true, nullable = false)
    private val id: Int? = null

    @OneToOne(cascade = [CascadeType.PERSIST, CascadeType.MERGE])
    @JoinColumn(name = "user_id")
    @MapsId
    private val user: User? = null
}