//
//  Snapshot.kt
//  incicord
//
//  Created by d-exclaimation on 4:41 PM.
//

package schema

/**
 * ### Event Snapshot
 *
 * Message JSON sent through websocket
 */
data class Snapshot<T>(
    val operation: String,
    val payload: T
) {
    companion object {
        /**
         * Creation Snapshot constructor
         */
        fun <T> creation(payload: T): Snapshot<T> = Snapshot(
            operation = "creation",
            payload = payload
        )

        /**
         * Mutation Snapshot constructor
         */
        fun <T> mutation(payload: T): Snapshot<T> = Snapshot(
            operation = "mutation",
            payload = payload
        )

        /**
         * Deletion Snapshot constructor
         */
        fun <T> deletion(payload: T): Snapshot<T> = Snapshot(
            operation = "deletion",
            payload = payload
        )
    }
}