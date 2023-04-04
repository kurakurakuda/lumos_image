import { kafkaClient } from './client/KafkaClient';
import { startUploadConsumer } from '../consumers/UploadConsumer';
import * as dotenv from 'dotenv';
dotenv.config();

const uploadRequestListenTopicName = process.env.TOPIC_UPLOAD_REQUEST;
const uploadResultListenTopicName = process.env.TOPIC_UPLOAD_RESULT;
const numOfUploadConsumer = 2;

export const createTopics = async () => {
  const admin = kafkaClient.admin();
  await admin.connect();
  await admin.createTopics({
    topics: [
      {
        topic: uploadRequestListenTopicName,
        numPartitions: 2,
        replicationFactor: 1
      },
      {
        topic: uploadResultListenTopicName,
        numPartitions: 2,
        replicationFactor: 1
      }
    ]
  });
  await admin.disconnect();

  for (let i = 0; i < numOfUploadConsumer; i++) {
    await startUploadConsumer(i);
  }
};
