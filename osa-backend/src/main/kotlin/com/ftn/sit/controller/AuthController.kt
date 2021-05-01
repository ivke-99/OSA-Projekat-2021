package com.ftn.sit.controller

import com.ftn.sit.security.JwtUtil
import com.ftn.sit.security.UserDetailsServiceImpl
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.DisabledException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/auth")
class AuthController(
    private val authenticationManager: AuthenticationManager,
    private val userDetailsService: UserDetailsServiceImpl,
    private val jwtUtil: JwtUtil,
) {
    @PostMapping("/authenticate")
    fun createAuthenticationToken(@RequestBody authenticationRequest: AuthenticationRequest): ResponseEntity<Any> {
        try {
            authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(
                    authenticationRequest.username, authenticationRequest.password
                )
            )
        } catch (e: DisabledException) {
            throw Exception("USER_DISABLED", e)
        } catch (e: BadCredentialsException) {
            throw Exception("INVALID_CREDENTIALS", e)
        }
        // load userDetails from database
        val userDetails = userDetailsService.loadUserByUsername(authenticationRequest.username)
        // generate access token
        val token: String = jwtUtil.generateToken(userDetails)
        return ResponseEntity.ok(
            mapOf(
                "token" to token,
            )
        )
    }

}

class AuthenticationRequest(val username: String, val password: String)