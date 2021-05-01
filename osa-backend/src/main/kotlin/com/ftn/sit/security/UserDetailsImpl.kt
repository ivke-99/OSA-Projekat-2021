package com.ftn.sit.security

import com.ftn.sit.model.User
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

class UserDetailsImpl(user: User) : UserDetails {
    private val username: String = user.username
    private val password: String = user.password
    private val authorities: MutableList<GrantedAuthority> =
        user.roleList.map { SimpleGrantedAuthority(it.toString()) }.toMutableList()
    private val active = user.active

    override fun getUsername(): String {
        return this.username
    }

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return this.authorities
    }

    override fun getPassword(): String {
        return this.password
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isEnabled(): Boolean {
        return active
    }
}