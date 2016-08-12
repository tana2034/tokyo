name := """tokyo"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)
lazy val myProject = (project in file(".")).enablePlugins(PlayJava, PlayEbean)

scalaVersion := "2.11.7"

libraryDependencies ++= Seq(
  jdbc,
  javaJdbc,
  cache,
  javaWs,
  "org.postgresql" % "postgresql" % "9.3-1101-jdbc41"
)
