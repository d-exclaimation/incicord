//
//  main.kt
//  incicord
//
//  Created by d-exclaimation on 8:38 PM.
//
import database.Incidents
import database.Repo
import incident.Controller

fun main() {
    Service(
        controller = Controller(
            repo = Repo(
                tables = listOf(Incidents)
            )
        ),
        corsEndpoints = listOf("http://localhost:3000")
    ).start()
}