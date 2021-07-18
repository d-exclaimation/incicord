import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm") version "1.5.21"
    application
}

group = "me.dexclaimation"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

object V {
    const val exposed = "0.32.1"
    const val jdbc = "0.24.1"
    const val javalin = "3.13.9"
    const val slf4j = "1.7.30"
    const val jackson = "2.10.5"
    const val postgresql = "42.2.0"
 }

dependencies {
    implementation(group = "org.jetbrains.exposed", name = "exposed-core", version = V.exposed)
    implementation(group = "org.jetbrains.exposed", name = "exposed-dao", version = V.exposed)
    implementation(group = "org.jetbrains.exposed", name = "exposed-jdbc", version = V.exposed)
    implementation("org.jetbrains.exposed:exposed-jdbc:${V.jdbc}")
    implementation(group = "io.javalin", name = "javalin", version = V.javalin)
    implementation(group = "org.slf4j", name = "slf4j-jdk14", version = V.slf4j)
    implementation(group = "com.fasterxml.jackson.core", name = "jackson-databind", version = V.jackson)
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    runtimeOnly("org.postgresql:postgresql:${V.postgresql}")
}

tasks.withType<KotlinCompile> {
    kotlinOptions.jvmTarget = "1.8"
}

application {
    mainClass.set("MainKt")
}