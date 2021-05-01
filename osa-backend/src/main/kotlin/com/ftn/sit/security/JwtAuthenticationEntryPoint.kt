package com.ftn.sit.security

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.http.MediaType
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.stereotype.Component
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
class JwtAuthenticationEntryPoint : AuthenticationEntryPoint {
    override fun commence(
        request: HttpServletRequest, response: HttpServletResponse,
        authException: AuthenticationException
    ) {
        // set status to unauthorized and content-type to json
        response.status = HttpServletResponse.SC_UNAUTHORIZED
        response.contentType = MediaType.APPLICATION_JSON_VALUE

        val exception = request.getAttribute("exception") as Exception?
        val body: ByteArray
        // try get exception passed as attribute in JwtAuthenticationFilter and return as json
        if (exception != null) {
            body = ObjectMapper().writeValueAsBytes(
                mapOf(
                    "exception" to exception.toString(),
                    "error" to exception.message,
                )
            )
        } else {
            // otherwise return authException as json
            val message =
                if (authException.cause != null) "${authException.cause} ${authException.message}"
                else authException.message.toString()

            body = ObjectMapper().writeValueAsBytes(
                mapOf(
                    "exception" to authException.toString(),
                    "error" to message,
                )
            )
        }
        response.outputStream.write(body)
    }
}