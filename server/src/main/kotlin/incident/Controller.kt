//
//  incident.IncidentController.kt
//  incicord
//
//  Created by d-exclaimation on 6:21 AM.
//
package incident

import database.Incidents
import database.Repo
import database.selectOne
import io.javalin.http.Context
import io.javalin.websocket.WsCloseContext
import io.javalin.websocket.WsConnectContext
import io.javalin.websocket.WsContext
import json.Data
import json.pipe
import json.tap
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.update
import schema.Cognizance
import schema.Incident
import schema.IncidentDTO
import schema.Snapshot
import java.lang.Integer.min
import java.time.ZoneId
import java.time.ZoneOffset
import java.time.ZonedDateTime
import java.util.concurrent.ConcurrentHashMap

/**
 * ### Main Controller
 *
 * Holds all of the route handlers
 */
class Controller(val repo: Repo) {
    private val listeners: ConcurrentHashMap<WsContext, Cognizance> = ConcurrentHashMap()

    /**
     * Fetch all incidents from the database
     * ---
     * GET "/incidents/all"
     * - limit: `Int`
     * @return `List<Incident>`
     */
    fun getLatest(ctx: Context) {
        val qLimit = (ctx.queryParam("limit") ?: "10").toIntOrNull()
            ?: return ctx
                .error("Invalid limit given", 400)
        val limit = min(qLimit, 40)

        val result = repo.contract {
            Incidents
                .selectAll()
                .limit(limit)
                .sortedByDescending { it[Incidents.lastOccurred] }
                .map(Incident::parsed)
        }

        result
            .pipe(Data.Companion::ok)
            .pipe(ctx::json)
    }

    /**
     * Create a new incident from the database
     * ---
     * POST "/incidents/create"
     * - body: `IncidentDTO`
     * @return`Incident`
     */
    fun createIncident(ctx: Context) {
        val body = ctx.body<IncidentDTO>()

        val result = repo.contract {
            val id = Incidents.insert {
                it[name] = body.name
                it[lastOccurred] = body.lastOccurred
                it[severity] = body.severity
            } get Incidents.id

            Incidents
                .selectOne { Incidents.id eq id }
                ?.pipe(Incident::parsed)
        } ?: return ctx
            .error("Failed on creation", 500)

        result
            .tap { broadcast(Snapshot.creation(it)) }
            .pipe(Data.Companion::ok)
            .pipe(ctx::json)
    }

    /**
     * Update incident record information
     * ---
     * PUT "/incidents/update"
     * - id: `Int`
     * - body: `IncidentDTO`
     * @return `Incident`
     */
    fun updateIncident(ctx: Context) {
        val id = ctx.queryParam("id")?.toIntOrNull()
            ?: return ctx
                .error("No id given")

        val body = ctx.body<IncidentDTO>()

        val result = repo.contract {
            Incidents.update({ Incidents.id eq id }) {
                it[name] = body.name
                it[lastOccurred] = body.lastOccurred
                it[severity] = body.severity
            }

            Incidents
                .selectOne { Incidents.id eq id }
                ?.pipe(Incident::parsed)
        } ?: return ctx
            .error("Cannot find record", 404)

        result
            .tap { broadcast(Snapshot.mutation(it)) }
            .pipe(Data.Companion::ok)
            .pipe(ctx::json)
    }

    /**
     * Reset last occurred
     * ---
     * PATCH "/incidents/reset"
     * - id: `Int`
     * @return `Incident`
     */
    fun resetLastOccurred(ctx: Context) {
        val id = ctx.queryParam("id")?.toIntOrNull()
            ?: return ctx
                .error("No id given")

        val result = repo.contract {
            Incidents.update({ Incidents.id eq id }) {
                it[lastOccurred] = ZonedDateTime.now(
                    ZoneId.ofOffset("", ZoneOffset.UTC)
                ).toString()
            }

            Incidents
                .selectOne { Incidents.id eq id }
                ?.pipe(Incident::parsed)
        } ?: return ctx
            .error("Cannot find record", 404)

        result
            .tap { broadcast(Snapshot.mutation(it)) }
            .pipe(Data.Companion::ok)
            .pipe(ctx::json)
    }

    /**
     * Delete a record
     * ---
     * DELETE "/incidents/delete"
     * - `id`: `Int`
     * @return `Cognizance`
     */
    fun deleteRecord(ctx: Context) {
        val id = ctx.queryParam("id")?.toIntOrNull()
            ?: return ctx
                .error("No id given")

        val result = repo.contract {
            val incident = Incidents
                .selectOne { Incidents.id eq id }
                ?.pipe(Incident::parsed)
            if (incident == null) {
                null
            } else {
                Incidents.deleteWhere { Incidents.id eq incident.id }
                incident
            }
        } ?: return ctx
            .error("Cannot find record", 404)

        result
            .tap { broadcast(Snapshot.deletion(it)) }
            .pipe(Data.Companion::ok)
            .pipe(ctx::json)
    }

    /**
     * Websocket join event handler
     * ---
     * WS "/updates"
     * @return `Cognizance`
     */
    fun joinEvent(ctx: WsConnectContext) {
        val res =
            if (listeners.contains(ctx))
                Cognizance.invalid
            else
                Cognizance.valid.tap { listeners[ctx] = it }
        res
            .pipe(ctx::send)
    }

    /**
     * Websocket close event handler
     * ---
     * WS "/updates"
     * @return `Cognizance`
     */
    fun closeEvent(ctx: WsCloseContext) {
        (listeners[ctx] ?: Cognizance.invalid)
            .tap { listeners.remove(ctx) }
            .pipe(ctx::send)
    }

    /**
     * Function to perform broadcast to all listeners
     */
    private fun <T> broadcast(snapshot: Snapshot<T>) {
        listeners
            .keys
            .filter { it.session.isOpen }
            .forEach {
                it.send(snapshot)
            }
    }

}

private fun Context.error(msg: String, status: Int = 400) {
    Data
        .error(msg)
        .tap { this.status(status) }
        .pipe(this::json)
}