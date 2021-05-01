package com.ftn.sit.model.dto

import com.ftn.sit.model.Product

class ViewProductDTO(
    var productName: String,
    var price: Double,
    var description: String,
){
    constructor(product: Product) : this(product.name,product.price,product.description)
}