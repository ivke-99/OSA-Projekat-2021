package com.ftn.sit.security

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Component
import org.springframework.util.StringUtils
import org.springframework.web.filter.OncePerRequestFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


@Component
class JwtAuthenticationFilter(private val jwtTokenUtil: JwtUtil) : OncePerRequestFilter() {

    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, chain: FilterChain) {
        try {
            /*
            JWT Token is in the form "Bearer token". Remove Bearer word and
             get  only the Token
            */
            val jwtToken = request.extractJwt()
            if (StringUtils.hasText(jwtToken) && jwtTokenUtil.validateToken(jwtToken)) {
                val userDetails: UserDetails = User(
                    jwtTokenUtil.getUsernameFromToken(jwtToken), "",
                    jwtTokenUtil.getRolesFromToken(jwtToken)
                )
                val usernamePasswordAuthenticationToken = UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.authorities
                )
                /*
                After setting the Authentication in the context, we specify
                that the current user is authenticated. So it passes the
                Spring Security Configurations successfully.
                */
                SecurityContextHolder.getContext().authentication = usernamePasswordAuthenticationToken
            }
        } catch (ex: Exception) {
            request.setAttribute("exception", ex)
        }

        chain.doFilter(request, response)
    }

    private fun HttpServletRequest.extractJwt(): String? {
        val bearerToken = this.getHeader("Authorization")
        return if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            bearerToken.substring(7, bearerToken.length)
        } else null
    }
}