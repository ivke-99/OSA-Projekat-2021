package com.ftn.sit.controller

import com.ftn.sit.model.dto.CreateProductDTO
import com.ftn.sit.model.dto.EditProductDTO
import com.ftn.sit.model.dto.ViewProductDTO
import com.ftn.sit.service.ProductService
import com.ftn.sit.util.BlankResult
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.*
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.*
import java.security.Principal
import javax.validation.Valid

@RestController
@RequestMapping("/products")
class ProductController(
    private val productService: ProductService
) {
    @GetMapping
    @PreAuthorize("hasAuthority('SALESMAN')")
    fun fetchSalesmanProducts(@RequestParam(required = false, defaultValue = "") searchTerm: String, principal: Principal): ResponseEntity<Any> {
        if (searchTerm.isNotBlank()) {
            val salesmanESProducts = productService.findAllBySearchTerm(searchTerm, principal)
            return ok(salesmanESProducts)
        }
        val salesmanProducts = productService.findAllProductsBySalesmanName(principal.name)
        return ok(salesmanProducts)
    }

    @GetMapping("/{productName}")
    @PreAuthorize("hasAuthority('SALESMAN')")
    fun fetchProduct(@PathVariable("productName") productName: String, principal: Principal): ResponseEntity<Any> =
        productService.findProductBySalesmanName(productName, principal)?.let {
            ok(ViewProductDTO(it))
        } ?: notFound().build()

    @PostMapping
    @PreAuthorize("hasAuthority('SALESMAN')")
    fun addProduct(
        @Valid @RequestBody dto: CreateProductDTO,
        principal: Principal,
        result: BindingResult
    ): ResponseEntity<Any> {
        if (result.hasErrors()) return ResponseEntity(result.allErrors, HttpStatus.BAD_REQUEST)
        return when (productService.createProduct(dto, principal.name)) {
            is BlankResult.Ok -> ok().build()
            is BlankResult.Error -> badRequest().body(mapOf("message" to "The item already exists."))
        }
    }

    @PutMapping("/{oldName}")
    @PreAuthorize("hasAuthority('SALESMAN')")
    fun updateProduct(
        @PathVariable("oldName") name: String,
        @Valid @RequestBody dto: EditProductDTO,
        principal: Principal,
        result: BindingResult
    ): ResponseEntity<Any> {
        if (result.hasErrors()) return ResponseEntity(result.allErrors, HttpStatus.BAD_REQUEST)
        return when (productService.saveDTO(dto, principal, name)) {
            is BlankResult.Ok -> ok().build()
            is BlankResult.Error -> badRequest().build()
        }
    }

    @DeleteMapping("/{productName}")
    @PreAuthorize("hasAuthority('SALESMAN')")
    fun deleteProduct(@PathVariable("productName") name: String, principal: Principal): ResponseEntity<Any> {
        val product =
            productService.findBySalesmanAndProductName(principal.name, name) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        productService.deleteProduct(product)
        return ok().build()
    }
}