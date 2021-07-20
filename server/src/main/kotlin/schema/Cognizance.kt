//
//  Cognizance.kt
//  incicord
//
//  Created by d-exclaimation on 4:15 PM.
//

package schema

import java.time.ZoneId
import java.time.ZoneOffset
import java.time.ZonedDateTime

/**
 * ### Cognizance of connection
 *
 * Confirmation on connection and closing
 */
data class Cognizance(
    val validation: Boolean,
    val timestamp: String
) {
    companion object {
        /**
         * Valid Cognizance Computed Data
         */
        val valid: Cognizance
            get() = Cognizance(
                validation = true,
                timestamp = ZonedDateTime.now(ZoneId.ofOffset("", ZoneOffset.UTC)).toString()
            )

        /**
         * Invalid Cognizance Computed Data
         */
        val invalid: Cognizance
            get() = Cognizance(
                validation = false,
                timestamp = "Invalid Cognizance has no timestamp"
            )
    }
}