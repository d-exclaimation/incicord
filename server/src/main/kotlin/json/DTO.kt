//
//  DataResponse.kt
//  incicord
//
//  Created by d-exclaimation on 8:50 PM.
//
package json

/**
 * ### Data Transfer Object
 *
 * For return JSON in form of
 * ```json
 * {
 *   "data": ...
 *   "errors": [
 *      "..."
 *   ]
 * }
 * ```
 */
data class DTO<T>(
    val data: T?,
    val errors: Collection<String>? = null
) {
    companion object {

        /** Create a new successful data response */
        fun <T> ok(data: T): DTO<T> = DTO(
            data = data,
            errors = null
        )

        /** Create a new unsuccessful data response with 1 error */
        fun error(msg: String): DTO<Any> = DTO(
            data = null,
            errors = listOf(msg)
        )

        /** Create a new unsuccessful data response with many errors */
        fun errors(errors: Collection<String>): DTO<Any> = DTO(
            data = null,
            errors = errors
        )
    }

    /** Create a new data and add a new error */
    fun error(msg: String): DTO<T> = DTO(
        data = data,
        errors = errors?.let { it + listOf(msg) }
    )

}

/**
 * Apply function to continue piping with functions
 */
fun <T> T.tap(effect: (T) -> Unit): T {
    effect(this)
    return this
}