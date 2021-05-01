package com.ftn.sit.security

import com.ftn.sit.repository.UserRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class UserDetailsServiceImpl(
    private val userRepository: UserRepository
) : UserDetailsService {
    override fun loadUserByUsername(userName: String): UserDetails {
        val user = userRepository.findUserByUsername(userName)
        return if (user != null) UserDetailsImpl(user) else throw UsernameNotFoundException("Username by $userName not found")
    }

}