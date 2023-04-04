import { Kafka } from 'kafkajs';

export const kafkaClient = new Kafka({
  clientId: 'lumos-image-kafka',
  brokers: ['kafka-server:9092']
});
