//
//  AppServer.kt
//  incicord
//
//  Created by d-exclaimation on 8:50 PM.
//
import config.port
import io.javalin.Javalin
import schema.VXController

/**
 * ### Javalin Service
 *
 * Holds the Javalin app and the callbacks
 */
class Service(
    val controller: ControllersObject,
    corsEndpoints: Collection<String> = listOf()
) {
    val app: Javalin = Javalin
        .create {
            corsEndpoints.forEach(it::enableCorsForOrigin)
        }
    private val port: Int = port()


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

/**
 * Controllers Object Interface
 */
interface ControllersObject {
    /**
     * Version 1 Controller
     */
    val v1: VXController
}