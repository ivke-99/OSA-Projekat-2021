package com.ftn.sit.repository

import com.ftn.sit.model.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository: JpaRepository<User, Long> {
    fun findUserByUsername(userName: String) : User?
}