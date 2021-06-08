package com.ftn.sit.model

import java.util.HashSet
import javax.persistence.*

@Entity
@Table(name = "users")
class User (
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id", unique = true, nullable = false)
    var id: Long = 0,
    @Column(unique = false, nullable = false)
    var firstName: String,
    @Column(unique = false, nullable = false)
    var surname: String,
    @Column(unique = true, nullable = false)
    var username: String,
    @Column(unique = false, nullable = false)
    var password: String,
    @Column(unique = false, nullable = false)
    var active: Boolean,
    @ElementCollection(fetch = FetchType.EAGER)
    var roleList: MutableList<Role> = mutableListOf(),
)

enum class Role {
    ADMIN, CUSTOMER, SALESMAN
}