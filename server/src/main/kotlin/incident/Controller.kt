//
//  incident.IncidentController.kt
//  incicord
//
//  Created by d-exclaimation on 6:21 AM.
//
package incident

import database.Incidents
import database.Repo
import database.schema.Incident
import io.javalin.http.Context
import json.Data
import json.pipe
import org.jetbrains.exposed.sql.selectAll
import java.lang.Integer.min

/**
 * ### Main Controller
 *
 * Holds all of the route handlers
 */
class Controller(val repo: Repo) {
    /**
     * Fetch all incidents from the database
     * ---
     * GET "/incident/all"
     * - limit: `Int`
     * @return `List<Incident>`
     */
    fun getLatest(ctx: Context) {
        val limit = min((ctx.queryParam("limit") ?: "10").toInt(), 40)
        repo
            .contract {
                Incidents
                    .selectAll()
                    .limit(limit)
                    .sortedByDescending { it[Incidents.lastOccurred] }
                    .map(Incident::parsed)
            }
            .pipe { Data.ok(it) }
            .pipe { ctx.json(it) }
    }

    /**
     * Create a new incident from the database
     * ---
     * POST "/incident/create"
     * - body: `IncidentDTO`
     * @return`Incident`
     */
    fun createIncident(ctx: Context) {
    }
}