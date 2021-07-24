//
//  AppServer.kt
//  incicord
//
//  Created by d-exclaimation on 8:50 PM.
//
import config.port
import incident.Controller
import io.javalin.Javalin

/**
 * ### Javalin Service
 *
 * Holds the Javalin app and the callbacks
 */
class Service(
    val controller: Controller,
    corsEndpoints: List<String> = listOf()
) {
    val app: Javalin = Javalin
        .create()
    private val port: Int = port()


    init {
        // Add Simple Event logging
        app.events { event ->
            event.serverStopped { println("Server shutting down") }
        }

        corsEndpoints.forEach(app.config::enableCorsForOrigin)

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