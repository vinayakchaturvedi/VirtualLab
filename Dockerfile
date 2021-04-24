FROM openjdk:8
MAINTAINER Rushikesh Jachak rushikesh.jachak@iiitb.org

WORKDIR ./
# copy jar file and resource modules
COPY ./target/virtuallab-0.0.1-SNAPSHOT.jar ./
COPY ./src/main/resources/ ./src/main/resources

# Install docker inside the webserver container
RUN pip3 install docker
RUN curl -sSL https://get.docker.com/ | sh
ENV SHARE_DIR /usr/local/share

ENTRYPOINT ["java", "-jar", "virtuallab-0.0.1-SNAPSHOT.jar"]