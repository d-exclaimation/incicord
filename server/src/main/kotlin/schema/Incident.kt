//
//  Incident.kt
//  incicord
//
//  Created by d-exclaimation on 8:50 PM.
//
package schema

import database.Incidents
import org.jetbrains.exposed.sql.ResultRow
import java.time.ZonedDateTime
import java.time.temporal.ChronoUnit
import kotlin.math.ceil
import kotlin.math.roundToInt

/**
 * ### Incident Object
 * Data class for Incident Object
 *
 * ```kotlin
 * val res: List<Incident> = IncidentsTable.selectAll().map { it.data() }
 * ```
 */
data class Incident(
    val id: Int,
    val name: String,
    val lastOccurred: String,
    val severity: String
) {
    val info: IncidentInfo

    init {
        // Computed info on initializer
        val date = ZonedDateTime.parse(lastOccurred)
        val now = ZonedDateTime.now()
        val diffDays = ChronoUnit.DAYS.between(date, now)
        val multiplier: Double = when (severity) {
            "severe" -> 2.0
            "mild" -> 1.5
            "calm" -> 1.1
            else -> 1.0
        }
        info = IncidentInfo(
            relativeDate = "$diffDays days since last occurred",
            streakColor = when ((diffDays / multiplier).roundToInt()) {
                in 12 until Int.MAX_VALUE -> "#00FFAE"
                in 8 until 12 -> "#FFEA00"
                in 4 until 8 -> "#FCB103"
                else -> "#FC0356"
            }
        )
    }

    companion object {
        /**
         * Parse result row into Incident Data class
         */
        fun parsed(row: ResultRow): Incident =
            Incident(
                id = row[Incidents.id],
                name = row[Incidents.name],
                lastOccurred = row[Incidents.lastOccurred],
                severity = row[Incidents.severity],
            )
    }
}

/**
 * ### Incident Additional Info
 * Useful computed info for Incident
 */
data class IncidentInfo(
    val relativeDate: String,
    val streakColor: String
)

/**
 * ### Incident Input
 * Data class for Input for Incident
 */
data class IncidentInput(
    val name: String,
    val lastOccurred: String,
    var severity: String
)