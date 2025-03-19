FROM openjdk:17-bullseye

# 타임존 설정
RUN apt-get update && apt-get install -y tzdata && rm -rf /var/lib/apt/lists/*

# JAR 파일 복사
ARG JAR_FILE=build/libs/*-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar

# ✅ flysabo.json을 컨테이너 내부로 복사
COPY src/main/resources/flysabo.json /app/resources/flysabo.json

# 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "/app.jar"]
