package com.ftn.sit.security

import io.jsonwebtoken.*
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Service
import java.util.*


@Service
class JwtUtil {
    private val secret: String = "secret_key"
    private var _jwtExpirationInMinutes: Long = 99999999
    private val jwtExpirationInMs
        get() = _jwtExpirationInMinutes * 60000

    fun generateToken(userDetails: UserDetails): String {
        // init empty claims
        val claims: MutableMap<String, Any> = hashMapOf()
        // get user roles from userDetails
        val roles = userDetails.authorities
        /*
        add roles within claims to support
        frontend role based routing logic
        */
        claims["roles"] = roles.map { it.authority }.toList()
        return generateToken(claims, userDetails.username)
    }


    private fun generateToken(claims: Map<String, Any>, subject: String): String {
        return Jwts.builder()
            .setClaims(claims)
            .setSubject(subject)
            .setIssuedAt(Date(System.currentTimeMillis()))
            .setExpiration(Date(System.currentTimeMillis() + jwtExpirationInMs))
            .signWith(SignatureAlgorithm.HS512, secret)
            .compact()
    }

    fun validateToken(authToken: String?): Boolean = try {
        Jwts.parser()
            .setSigningKey(secret)
            .parseClaimsJws(authToken)
        true
    } catch (ex: SignatureException) {
        throw BadCredentialsException("INVALID_CREDENTIALS", ex)
    } catch (ex: MalformedJwtException) {
        throw BadCredentialsException("INVALID_CREDENTIALS", ex)
    } catch (ex: UnsupportedJwtException) {
        throw BadCredentialsException("INVALID_CREDENTIALS", ex)
    } catch (ex: IllegalArgumentException) {
        throw BadCredentialsException("INVALID_CREDENTIALS", ex)
    } catch (ex: ExpiredJwtException) {
        throw ex
    }

    fun getUsernameFromToken(token: String?): String {
        val claims = Jwts.parser()
            .setSigningKey(secret)
            .parseClaimsJws(token)
            .body
        return claims.subject
    }

    @Suppress("UNCHECKED_CAST")
    fun getRolesFromToken(token: String?): List<SimpleGrantedAuthority>? {
        val claims = Jwts.parser()
            .setSigningKey(secret)
            .parseClaimsJws(token)
            .body

        // we're safe to cast claims["roles"] to a List of Strings
        val claimsAsRoles = claims["roles"] as List<String>

        return claimsAsRoles.map { SimpleGrantedAuthority(it) }
    }
}