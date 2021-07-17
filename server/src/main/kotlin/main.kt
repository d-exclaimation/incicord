//
//  main.kt
//  incicord
//
//  Created by d-exclaimation on 8:38 PM.
//
import config.databaseUrl
import database.Repo
import incident.IncidentController

fun main() {
    val repo = Repo(url = databaseUrl())
    val controller = IncidentController(repo = repo)
    val server = AppServer(
        controller = controller
    )
    server.start()
}