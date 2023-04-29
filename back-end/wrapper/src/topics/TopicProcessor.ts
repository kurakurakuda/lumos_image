import { kafkaClient } from './client/KafkaClient';
import * as dotenv from 'dotenv';
dotenv.config();

const uploadResultListenTopicName = process.env.TOPIC_UPLOAD_RESULT;

export const createTopics = async () => {
  const admin = kafkaClient.admin();
  await admin.connect();
  await admin.createTopics({
    topics: [
      {
        topic: uploadResultListenTopicName,
        numPartitions: 2,
        replicationFactor: 1
      }
    ]
  });
  await admin.disconnect();
};
