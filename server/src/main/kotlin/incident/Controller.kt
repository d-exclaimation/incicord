//
//  incident.IncidentController.kt
//  incicord
//
//  Created by d-exclaimation on 6:21 AM.
//
package incident

import database.Incidents
import database.Repo
import database.schema.data
import io.javalin.http.Context
import json.DataResponse
import org.jetbrains.exposed.sql.selectAll


class Controller(val repo: Repo) {
    fun getLatest(ctx: Context) {
        val res = repo.sql {
            Incidents
                .selectAll()
                .limit(10)
                .sortedByDescending { it[Incidents.lastOccurred] }
                .map { it.data() }
        }
        ctx.json(DataResponse(res))
    }
}