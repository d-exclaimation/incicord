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

dependencies {
    implementation(group = "org.jetbrains.exposed", name = "exposed-core", version = "0.32.1")
    implementation(group = "org.jetbrains.exposed", name = "exposed-dao", version = "0.32.1")
    implementation(group = "org.jetbrains.exposed", name = "exposed-jdbc", version = "0.32.1")
    implementation("org.jetbrains.exposed:exposed-jdbc:0.24.1")
    implementation(group = "io.javalin", name = "javalin", version = "3.13.9")
    implementation(group = "org.slf4j", name = "slf4j-jdk14", version = "1.7.30")
    implementation(group = "com.fasterxml.jackson.core", name = "jackson-databind", version = "2.10.5")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    runtimeOnly("org.postgresql:postgresql:42.2.0")
}

tasks.withType<KotlinCompile> {
    kotlinOptions.jvmTarget = "1.8"
}

application {
    mainClass.set("MainKt")
}