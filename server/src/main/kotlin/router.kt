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
        path("incident") {
            get("/all", controller::getLatest)
            post("/create", controller::createIncident)
        }
    }
}