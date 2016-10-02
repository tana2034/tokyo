name := """tokyo"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)
lazy val myProject = (project in file("."))
  .enablePlugins(PlayJava, PlayEbean)
  .settings(
    ReactJsKeys.harmony := true,
    ReactJsKeys.es6module := true,
    ReactJsKeys.stripTypes := true
  )

scalaVersion := "2.11.7"

libraryDependencies ++= Seq(
  javaJdbc,
  cache,
  javaWs,
  "org.postgresql" % "postgresql" % "9.3-1101-jdbc41",
  "org.webjars" %% "webjars-play" % "2.5.0",
  "org.webjars" % "jquery" % "3.1.0",
  "org.webjars" % "react" % "15.2.1",
  "org.webjars" % "react-redux" % "4.4.5",
  "org.webjars" % "redux" % "3.4.0",
  "org.webjars.npm" % "redux-thunk" % "2.1.0"
)

routesGenerator := InjectedRoutesGenerator

import play.sbt.PlayImport.PlayKeys.playRunHooks
playRunHooks <+= baseDirectory.map(base => Gulp(base, "build"))
