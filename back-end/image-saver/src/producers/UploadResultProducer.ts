import { Message } from 'kafkajs';
import UploadResultDto from '../dto/UploadResultDto';
import { kafkaClient } from '../topics/client/KafkaClient';
import * as dotenv from 'dotenv';
dotenv.config();

const uploadResultListenTopicName = process.env.TOPIC_UPLOAD_RESULT;

export const sendUploadResult = async (result: UploadResultDto) => {
  try {
    const msg: Message = {
      value: JSON.stringify(result)
    };

    const producer = kafkaClient.producer();
    await producer.connect();
    await producer.send({
      topic: uploadResultListenTopicName,
      messages: [msg]
    });

    await producer.disconnect();

    console.log(`sent message to ${uploadResultListenTopicName}`);
  } catch (err) {
    console.log(`Failed to send message to ${uploadResultListenTopicName}`);
    console.error(err);
  }
};
