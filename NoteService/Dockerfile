FROM java:8-jre
ADD ./target/NoteService-0.0.1-SNAPSHOT.jar /usr/src/NoteService-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENTRYPOINT ["java","-jar","NoteService-0.0.1-SNAPSHOT.jar"]