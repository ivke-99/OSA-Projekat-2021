package com.ftn.sit.model.elastic

import org.elasticsearch.common.text.Text
import org.springframework.data.annotation.Id
import org.springframework.data.elasticsearch.annotations.Document
import org.springframework.data.elasticsearch.annotations.Field
import org.springframework.data.elasticsearch.annotations.FieldType
import org.springframework.data.elasticsearch.annotations.Setting
import java.time.LocalDateTime

@Document(indexName = "orders")
@Setting(settingPath = "/analyzers/serbianAnalyzer.json")
class OrderES(
    @Id
    var id: Long,
    var salesmanId: Long,
    @Field(type = FieldType.Text)
    var comment: String,
)