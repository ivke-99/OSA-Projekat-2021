package com.ftn.sit.repository

import com.ftn.sit.model.elastic.ArticleES
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository
import org.springframework.stereotype.Repository

@Repository
interface ArticleESRepository: ElasticsearchRepository<ArticleES, String> {
    fun findAllByNameLikeAndSalesmanId(name: String, salesmanId: Long) : MutableList<ArticleES>
}