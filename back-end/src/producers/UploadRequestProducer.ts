import { Message } from 'kafkajs';
import { kafkaClient } from '../topics/client/KafkaClient';
import * as dotenv from 'dotenv';
import IUploadDto from '../dto/interface/IUploadDto';
dotenv.config();

const uploadRequestListenTopicName = process.env.TOPIC_UPLOAD_REQUEST;

export const uploadProducer = async (req: IUploadDto) => {
  try {
    const msg: Message = {
      value: JSON.stringify(req)
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
    throw Error();
  }
  return req.correlationId;
};
