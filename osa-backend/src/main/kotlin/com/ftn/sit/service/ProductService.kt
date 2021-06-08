package com.ftn.sit.service

import com.ftn.sit.model.Product
import com.ftn.sit.model.Salesman
import com.ftn.sit.model.dto.CreateProductDTO
import com.ftn.sit.model.dto.EditProductDTO
import com.ftn.sit.model.dto.ViewProductDTO
import com.ftn.sit.repository.ProductRepository
import com.ftn.sit.repository.SalesmanRepository
import com.ftn.sit.repository.UserRepository
import com.ftn.sit.util.BlankResult
import org.springframework.stereotype.Service
import java.security.Principal

@Service
class ProductService(
    private val productRepository: ProductRepository,
    private val salesmanRepository: SalesmanRepository,
    private val userRepository: UserRepository,
) {
    fun findAllProductsBySalesmanName(name: String): List<ViewProductDTO> {
        val products = productRepository.findAllBySalesmanUserUsername(name)
        return products.map {
            ViewProductDTO(it)
        }
    }

    fun findProductBySalesmanName(productName: String, principal: Principal): Product? {
        return productRepository.findByNameAndSalesmanUserUsername(productName, principal.name)
    }

    fun findSalesmanByUsername(username: String): Salesman {
        return salesmanRepository.findSalesmanByUser(userRepository.findUserByUsername(username)!!)
    }

    fun checkIfSalesmanHasSameProductName(productName: String, username: String): Boolean {
        return findAllProductsBySalesmanName(username).any { f ->
            f.productName == productName
        }
    }

    fun findBySalesmanAndProductName(username: String, productName: String): Product? =
        productRepository.findByNameAndSalesman(productName, findSalesmanByUsername(username))

    fun createProduct(dto: CreateProductDTO, username: String): BlankResult =
        if (!checkIfSalesmanHasSameProductName(dto.productName, username)) {
            val product = Product(
                id = 0,
                name = dto.productName,
                price = dto.price,
                description = dto.description,
                productImage = "",
                salesman = findSalesmanByUsername(username),
            )
            productRepository.save(product)
            BlankResult.Ok
        } else {
            BlankResult.Error
        }

    fun saveDTO(dto: EditProductDTO, principal: Principal, oldName: String): BlankResult =
        productRepository.findByNameAndSalesmanUserUsername(oldName, principal.name)?.run {
            name = dto.productName
            description = dto.description
            price = dto.price
            productRepository.save(this)
            BlankResult.Ok
        } ?: BlankResult.Error


    fun deleteProduct(product: Product) = productRepository.delete(product)
}