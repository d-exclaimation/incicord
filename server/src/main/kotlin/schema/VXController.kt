//
//  VXController.kt
//  incicord
//
//  Created by d-exclaimation on 8:07 PM.
//

package schema

import io.javalin.http.Context
import io.javalin.websocket.WsCloseContext
import io.javalin.websocket.WsConnectContext


interface VXController {
    /**
     * Fetch all incidents from the database
     * ---
     * GET "/incidents/all"
     * - limit: `Int`
     * @return `List<Incident>`
     */
    fun getLatest(ctx: Context)


    /**
     * Create a new incident from the database
     * ---
     * POST "/incidents/create"
     * - body: `IncidentDTO`
     * @return`Incident`
     */
    fun createIncident(ctx: Context)

    /**
     * Update incident record information
     * ---
     * PUT "/incidents/update"
     * - id: `Int`
     * - body: `IncidentDTO`
     * @return `Incident`
     */
    fun updateIncident(ctx: Context)

    /**
     * Reset last occurred
     * ---
     * PATCH "/incidents/reset"
     * - id: `Int`
     * @return `Incident`
     */
    fun resetLastOccurred(ctx: Context)

    /**
     * Delete a record
     * ---
     * DELETE "/incidents/delete"
     * - `id`: `Int`
     * @return `Cognizance`
     */
    fun deleteRecord(ctx: Context)

    /**
     * Websocket join event handler
     * ---
     * WS "/updates"
     * @return `Cognizance`
     */
    fun joinEvent(ctx: WsConnectContext)

    /**
     * Websocket close event handler
     * ---
     * WS "/updates"
     * @return `Cognizance`
     */
    fun closeEvent(ctx: WsCloseContext)
}