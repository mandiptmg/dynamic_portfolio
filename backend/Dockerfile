# Use the official OpenJDK 21 image
FROM openjdk:21-jdk-slim

WORKDIR /app

# Copy the build files
COPY . .

# Expose the application port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "backend.jar"]
