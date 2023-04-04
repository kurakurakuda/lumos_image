import { Message } from 'kafkajs';
import UploadResultDto from '../dto/UploadReultDto';
import { kafkaClient } from '../topics/client/KafkaClient';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const uploadRequestListenTopicName = process.env.TOPIC_UPLOAD_REQUEST;
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

export const processProducer = async (req: Request, res: Response) => {
  try {
    const msg: Message = {
      value: JSON.stringify(req.body)
    };

    const producer = kafkaClient.producer();
    await producer.connect();
    await producer.send({
      topic: uploadRequestListenTopicName,
      messages: [msg]
    });

    await producer.disconnect();

    console.log('processProducer was done');
  } catch (e) {
    console.log(e);
  }
  return res.send('Hello World!');
};
