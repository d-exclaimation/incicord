//
//  Repo.kt
//  incicord
//
//  Created by d-exclaimation on 1:52 PM.
//

package database

import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.Transaction
import org.jetbrains.exposed.sql.transactions.transaction


class Repo(url: String) {
    var conn = Database.connect(
        url = "jdbc:$url",
        user = "postgres",
        password = "postgres",
        driver = "org.postgresql.Driver"
    )

//    init {
//        transaction {
//            SchemaUtils.drop(Incidents)
//            SchemaUtils.create(Incidents)
//        }
//    }

    fun <T> sql(trans: Transaction.() -> T): T {
        return transaction(conn, trans)
    }
}