//
//  main.kt
//  incicord
//
//  Created by d-exclaimation on 8:38 PM.
//
import config.databaseUrl
import database.Repo
import incident.Controller

fun main() {
    val repo = Repo(url = databaseUrl())
    val controller = Controller(repo = repo)
    val server = Service(
        controller = controller
    )
    server.start()
}