//
//  main.kt
//  incicord
//
//  Created by d-exclaimation on 8:38 PM.
//
import database.Incidents
import database.Repo
import incident.Controller
import schema.VXController

fun main() {
    val database = Repo(tables = listOf(Incidents))
    val v1 = Controller(repo = database)
    Service(
        controller = object : ControllersObject {
            override val v1: VXController = v1
        },
        corsEndpoints = listOf("http://localhost:3000")
    ).start()
}