package com.ftn.sit.util

sealed class Result<out T : Any> {
    data class Ok<out T : Any>(val data: T) : Result<T>()
    data class Error(val message: String?, val ex: Exception?) : Result<Nothing>()
}

sealed class BlankResult {
    object Ok : BlankResult()
    object Error : BlankResult()
}