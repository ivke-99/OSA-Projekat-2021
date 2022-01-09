FROM gradle:7.3.3-jdk11-alpine as builder
USER root
WORKDIR /builder
ADD . /builder
RUN gradle build --stacktrace

FROM openjdk:11-jre-slim
WORKDIR /osa-backend
EXPOSE 8080
COPY --from=builder /builder/build/libs/sit-0.0.1-SNAPSHOT.jar .
CMD ["java", "-jar", "sit-0.0.1-SNAPSHOT.jar"]
