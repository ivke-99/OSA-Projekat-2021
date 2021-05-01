package com.ftn.sit.configuration

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.ClassPathResource
import org.springframework.core.io.support.PropertiesLoaderUtils
import org.springframework.scheduling.annotation.EnableAsync
import java.util.*

@Configuration
@EnableAsync
class BeanConfiguration {

    @Bean(name = ["passay"])
    fun getMyProperties(): Properties {
        return PropertiesLoaderUtils.loadProperties(
            ClassPathResource("/passay.properties")
        )
    }
}