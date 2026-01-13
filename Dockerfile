# 1. Build the project using Maven
FROM maven:3.8-openjdk-17 AS build
COPY . .
RUN mvn clean package

# 2. Deploy to Tomcat
FROM tomcat:10-jdk17-openjdk-slim
# Remove default Tomcat apps
RUN rm -rf /usr/local/tomcat/webapps/*
# Copy the built .war file to Tomcat (naming it ROOT.war makes it the main site)
COPY --from=build /target/*.war /usr/local/tomcat/webapps/ROOT.war

EXPOSE 8080
CMD ["catalina.sh", "run"]