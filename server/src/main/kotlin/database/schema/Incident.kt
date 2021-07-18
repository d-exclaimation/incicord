//
//  Incident.kt
//  incicord
//
//  Created by d-exclaimation on 8:50 PM.
//
package database.schema

import database.Incidents
import org.jetbrains.exposed.sql.ResultRow

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

