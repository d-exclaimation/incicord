//
//  main.kt
//  incicord
//
//  Created by d-exclaimation on 8:38 PM.
//
import database.Incidents
import database.Repo
import incident.V1Controller

fun main() {
    val database = Repo(
        tables = listOf(Incidents)
    )
    val controllers = object : ControllersObject {
        override val v1 = V1Controller(repo = database)
    }
    Service(controller = controllers, corsEndpoints = listOf("http://localhost:3000")).start()
}