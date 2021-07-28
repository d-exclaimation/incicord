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
        path("v1") {
            path("incidents") {
                get("/all", controller.v1::getLatest)
                post("/create", controller.v1::createIncident)
                put("/update", controller.v1::updateIncident)
                patch("/reset", controller.v1::resetLastOccurred)
                delete("/delete", controller.v1::deleteRecord)
            }

            ws("/updates") {
                it.onConnect(controller.v1::joinEvent)
                it.onClose(controller.v1::closeEvent)
            }
        }
    }
}