//
//  router.kt
//  incicord
//
//  Created by d-exclaimation on 6:04 AM.
//

/**
 * Routing declaration and assigning controllers or handlers
 * ```kotlin
 * app.get("/") { controller.get(it) }
 * ```
 */
fun AppServer.router() {
    app.get( "/") { controller.getLatest(it) }
}