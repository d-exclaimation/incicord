//
//  router.kt
//  incicord
//
//  Created by d-exclaimation on 6:04 AM.
//
import io.javalin.apibuilder.ApiBuilder.*

/**
 * Routing declaration and assigning controllers or handlers
 * ```kotlin
 * app.get("/") { controller.get(it) }
 * ```
 */
fun Service.router() {
    app.routes {
        path("incidents") {
            get("/all", controller::getLatest)
            post("/create", controller::createIncident)
            put("/update", controller::updateIncident)
            patch("/reset", controller::resetLastOccurred)
        }

        ws("/updates") {
            it.onConnect(controller::joinEvent)
            it.onClose(controller::closeEvent)
        }
    }
}