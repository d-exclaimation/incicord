//
//  DataResponse.kt
//  incicord
//
//  Created by d-exclaimation on 8:50 PM.
//
package json

/**
 * ### Data Response Wrapper
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
data class Data<T>(
    val data: T?,
    val errors: List<String> = listOf()
) {
    companion object {

        /** Create a new successful data response */
        fun <T> ok(data: T): Data<T> = Data(
            data = data
        )

        /** Create a new unsuccessful data response with 1 error */
        fun error(msg: String): Data<Any> = Data(
            data = null,
            errors = listOf(msg)
        )

        /** Create a new unsuccessful data response with many errors */
        fun errors(errors: List<String>): Data<Any> = Data(
            data = null,
            errors = errors
        )
    }

    /** Create a new data and add a new error */
    fun error(msg: String): Data<T> = Data(
        data = data,
        errors = errors + listOf(msg)
    )

}

/**
 * Apply function to continue piping with functions
 */
fun <T, K> T.pipe(transform: (T) -> K): K {
    return transform(this)
}
