# Use the official OpenJDK 21 image
FROM openjdk:21-jdk-slim

WORKDIR /app

# Copy the build files
COPY ./target/Mandip-0.0.1-SNAPSHOT.jar app.jar

# Expose the application port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
