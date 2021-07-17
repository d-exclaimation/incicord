//
//  AppServer.kt
//  incicord
//
//  Created by d-exclaimation on 8:50 PM.
//
import database.Repo
import incident.IncidentController
import io.javalin.Javalin


class AppServer(val controller: IncidentController) {
    val app: Javalin = Javalin.create()
    private val port: Int = 4000

    init {
        // Add Simple Event logging
        app.events { event ->
            event.serverStopped { println("Server shutting down") }
        }

        // Set the router
        router()

        // Graceful shutdown
        Runtime.getRuntime().addShutdownHook(Thread { app.stop() })
    }

    /**
     * Start the AppServer
     */
    fun start(): Javalin? = app.start(port)
}