# Technology

[Apache Kafka](https://kafka.apache.org/documentation/#gettingStarted)  
[Docker Image - bitnami](https://hub.docker.com/r/bitnami/kafka)

# Kafka Commands

List up containers

> docker ps -a

Get into Kafka container

> docker container exec -it ${container-id} bash

Move to Kafka Directory

> cd /opt/bitnami/kafka/bin

List up topics

> kafka-topics.sh --list --bootstrap-server localhost:9092

Create topic

> kafka-topics.sh --create --topic sample-events --bootstrap-server localhost:9092  
> Created topic ${sample-events}.

Send messages to topic

> kafka-console-producer.sh --topic ${sample-events} --bootstrap-server localhost:9092  
> \> hello  
> \> world  
> \> foo

Consume messages from topic

> kafka-console-consumer.sh --topic ${sample-events} --from-beginning -bootstrap-server localhost:9092  
> hello  
> world  
> foo
