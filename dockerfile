FROM node:14.16.0-alpine3.10 as build
WORKDIR /app
COPY ./frontend/package*.json ./
RUN npm ci
COPY ./frontend ./
RUN npm run build

FROM openjdk:11-jdk as backend
RUN mkdir src
COPY ./backend /src
COPY --from=build /app/build /src/src/main/resources/static
WORKDIR /src
RUN ./mvnw clean install package

FROM openjdk:11-jdk
RUN addgroup -system spring && useradd -G spring user
COPY --from=backend /src/target /build
WORKDIR /build
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "backend-0.0.1-SNAPSHOT.jar"]