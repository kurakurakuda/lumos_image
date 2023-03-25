import { Kafka, Message } from 'kafkajs';
import { Request, Response } from 'express';

const kafka = new Kafka({
  clientId: 'lumos-image-kafka',
  brokers: ['kafka-server:9092']
});

const topicName = 'sample-topic';
const consumerNumber = process.argv[2] || '1';

export const processTopic = async () => {
  const admin = kafka.admin();
  await admin.connect();
  await admin.createTopics({
    topics: [
      {
        topic: topicName,
        numPartitions: 2,
        replicationFactor: 1
      }
    ]
  });
  await admin.disconnect();
};

export const processConsumer = async () => {
  const consumer1 = kafka.consumer({ groupId: 'sample' });
  await consumer1.connect();
  await consumer1.subscribe({ topic: topicName });

  const consumer2 = kafka.consumer({ groupId: 'sample' });
  await consumer2.connect();
  await consumer2.subscribe({ topic: topicName });

  let counter1 = 1;
  let counter2 = 1;

  console.log('consumer starts to run');

  await consumer1.run({
    // eslint-disable-next-line @typescript-eslint/require-await
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `received a new message number: ${counter1} on consumer1#${consumerNumber}: `,
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
      counter1++;
    }
  });

  await consumer2.run({
    // eslint-disable-next-line @typescript-eslint/require-await
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `received a new message number: ${counter2} on consumer2#${consumerNumber}: `,
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
      counter2++;
    }
  });
};

export const processProducer = async (req: Request, res: Response) => {
  try {
    const msg: Message = {
      value: JSON.stringify(req.body)
    };

    const producer = kafka.producer();
    await producer.connect();
    await producer.send({
      topic: topicName,
      messages: [msg]
    });

    await producer.disconnect();

    console.log('processProducer was done');
  } catch (e) {
    console.log(e);
  }
  return res.send('Hello World!');
};
