//
//  Incident.kt
//  incicord
//
//  Created by d-exclaimation on 8:50 PM.
//
package database.schema

import database.Incidents
import org.jetbrains.exposed.sql.ResultRow

data class Incident(
    val id: Int,
    val name: String,
    val lastOccurred: String,
    val severity: String
)

fun ResultRow.data(): Incident {
    return Incident(
        id = this[Incidents.id],
        name = this[Incidents.name],
        lastOccurred = this[Incidents.lastOccurred],
        severity = this[Incidents.severity],
    )
}