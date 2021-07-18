//
//  Repo.kt
//  incicord
//
//  Created by d-exclaimation on 1:52 PM.
//

package database

import config.databaseUrl
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.Transaction
import org.jetbrains.exposed.sql.transactions.transaction


/**
 * ### Exposed DB Repository
 *
 * Holds the database connection and abstract away transactions
 */
class Repo(
    url: String = databaseUrl(),
    private val tables: List<Table>
) {
    private val shouldCreateTables = false
    private var db = Database.connect(
        url = "jdbc:$url",
        user = "postgres",
        password = "postgres",
        driver = "org.postgresql.Driver"
    )

    init {
        if (shouldCreateTables) {
            contract {
                for (table in tables) {
                    SchemaUtils.drop(table)
                    SchemaUtils.create(table)
                }
            }
        }
    }

    /**
     * Contract SQL transaction to the database connection
     */
    fun <T> contract(trans: Transaction.() -> T): T {
        return transaction(db, trans)
    }
}