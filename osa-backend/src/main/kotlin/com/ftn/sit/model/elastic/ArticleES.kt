package com.ftn.sit.model.elastic

import org.springframework.data.annotation.Id
import org.springframework.data.elasticsearch.annotations.Document
import org.springframework.data.elasticsearch.annotations.Setting

@Document(indexName = "articles")
@Setting(settingPath = "/analyzers/serbianAnalyzer.json")
class ArticleES(
    @Id
    var id: Long,
    var name: String,
    var salesmanId: Long,
)