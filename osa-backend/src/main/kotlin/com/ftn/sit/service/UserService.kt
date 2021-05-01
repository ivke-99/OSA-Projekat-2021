package com.ftn.sit.service

import com.ftn.sit.model.User
import com.ftn.sit.repository.UserRepository
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder
) {
    fun findUserByUsername(username: String) = userRepository.findUserByUsername(username)
    fun doesUsernameExist(username: String) = findUserByUsername(username) != null
    fun saveUser(user: User) = userRepository.save(user)
    fun checkIsPasswordSameAsOld(oldPassword: String, username: String) : Boolean {
        val user = findUserByUsername(username) ?: return false
        return passwordEncoder.matches(oldPassword, user.password)
    }
}