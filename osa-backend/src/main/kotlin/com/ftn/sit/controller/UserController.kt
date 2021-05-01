package com.ftn.sit.controller

import com.ftn.sit.model.dto.UserEditDTO
import com.ftn.sit.model.dto.UserPasswordEditDTO
import com.ftn.sit.model.dto.UserViewDTO
import com.ftn.sit.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.*
import java.security.Principal
import javax.validation.Valid

@RestController
@RequestMapping("/user")
class UserController(
    private val userService: UserService,
    private val passwordEncoder: PasswordEncoder
) {

    //user can't be null since he is logged in
    @GetMapping("/me")
    fun getUserSelf(principal: Principal): ResponseEntity<UserViewDTO> {
        val user = userService.findUserByUsername(principal.name)!!
        return ResponseEntity<UserViewDTO>(UserViewDTO(user), HttpStatus.OK)
    }

    @PutMapping("/me/update/password")
    fun updateSelfUserPassword(
        principal: Principal,
        @Valid @RequestBody dtoPassword: UserPasswordEditDTO,
        bindingResult: BindingResult
    ): ResponseEntity<Any> {
        if (!userService.checkIsPasswordSameAsOld(dtoPassword.oldPassword, principal.name))
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build()
        return if (bindingResult.hasErrors()) ResponseEntity.badRequest().build()
        else {
            val user = userService.findUserByUsername(principal.name)!!
            user.run {
                password = passwordEncoder.encode(dtoPassword.password)
            }
            userService.saveUser(user)
            return ResponseEntity.ok().build()
        }
    }

    @PutMapping("/me/update/info")
    fun updateSelfUserInfo(
        principal: Principal,
        @Valid @RequestBody dtoUserInfo: UserEditDTO,
        bindingResult: BindingResult
    ): ResponseEntity<Any> {
        return if (bindingResult.hasErrors()) ResponseEntity.badRequest().build()
        else {
            val user = userService.findUserByUsername(principal.name)!!
            user.run {
                firstName = dtoUserInfo.firstName
                surname = dtoUserInfo.surname
            }
            userService.saveUser(user)
            return ResponseEntity.ok().build()
        }
    }
}