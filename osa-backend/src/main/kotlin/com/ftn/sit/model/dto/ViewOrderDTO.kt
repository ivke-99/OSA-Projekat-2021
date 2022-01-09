package com.ftn.sit.model.dto

import com.ftn.sit.model.Order
import java.time.LocalDateTime

class ViewOrderDTO(
    var isAnonComment: Boolean,
    var timeOfOrder: LocalDateTime,
    var comment: String,
){
    constructor(order: Order) : this(order.isAnonComment, order.timeOfOrder, order.comment ?: "")
}