FROM openjdk:8
MAINTAINER Rushikesh Jachak rushikesh.jachak@iiitb.org
COPY ./target/virtuallab-0.0.1-SNAPSHOT.jar ./
WORKDIR ./
ENTRYPOINT ["java", "-jar", "virtuallab-0.0.1-SNAPSHOT.jar"]