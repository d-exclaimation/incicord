//
//  tables.kt
//  incicord
//
//  Created by d-exclaimation on 8:50 PM.
//
package database

import org.jetbrains.exposed.sql.Table

object Incidents : Table() {
    val id = integer("id").autoIncrement()
    val name = varchar("name", 255)
    val lastOccurred = varchar("last_occurred", 255)
    val severity = varchar("severity", 8)
}

