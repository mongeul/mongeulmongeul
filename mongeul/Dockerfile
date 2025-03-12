FROM openjdk:17-bullseye
RUN apt-get update && apt-get install -y tzdata && rm -rf /var/lib/apt/lists/*
ARG JAR_FILE=build/libs/*-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
