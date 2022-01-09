package com.ftn.sit.repository

import com.ftn.sit.model.elastic.OrderES
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository
import org.springframework.stereotype.Repository

@Repository
interface OrderESRepository: ElasticsearchRepository<OrderES, String> {
    fun findAllBySalesmanIdAndCommentLike(salesmanId: Long, comment: String) : MutableList<OrderES>
}