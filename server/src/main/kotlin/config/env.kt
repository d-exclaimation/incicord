//
//  env.kt
//  incicord
//
//  Created by d-exclaimation on 1:12 PM.
//

package config

fun databaseUrl(): String = System.getenv("DB_URL") ?: "postgresql://localhost:5432/incicord"
fun port(): Int = (System.getenv("PORT") ?: "4000").toInt()