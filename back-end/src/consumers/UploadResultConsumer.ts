import { kafkaClient } from '../topics/client/KafkaClient';
import * as socketIo from 'socket.io';
import * as dotenv from 'dotenv';
dotenv.config();

const uploadResultListenTopicName = process.env.TOPIC_UPLOAD_RESULT;
const uploadResultProcessorGroup = 'upload-result-processor-group';

export const startUploadResultConsumer = async (socket: socketIo.Socket) => {
  const consumer = kafkaClient.consumer({
    groupId: uploadResultProcessorGroup
  });
  await consumer.connect();
  await consumer.subscribe({ topic: uploadResultListenTopicName });

  await consumer.run({
    // eslint-disable-next-line @typescript-eslint/require-await
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `startUploadResultConsumer received a new message number: on consumer }: `,
        {
          topic,
          partition,
          message: {
            offset: message.offset,
            headers: message.headers,
            value: message.value.toString()
          }
        }
      );

      console.log(`Sending upload result was completed.`);
      socket.emit('foo', message.value.toString());
    }
  });
};
