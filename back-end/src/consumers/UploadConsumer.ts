import { v4 } from 'uuid';
import IUploadDto from '../dto/interface/IUploadDto';
import UploadResultDto from '../dto/UploadResultDto';
import { sendUploadResult } from '../producers/UploadResultProducer';
import { insertImageMetaData } from '../repository/ImageRepository';
import { ValidateUploadRequest } from '../services/RequestValidator';
import { buildImagePath, upload } from '../services/StorageService';
import { kafkaClient } from '../topics/client/KafkaClient';
import * as dotenv from 'dotenv';
dotenv.config();

const uploadRequestListenTopicName = process.env.TOPIC_UPLOAD_REQUEST;
const uploadProcessorGroup = 'upload-processor-group';

export const startUploadConsumer = async (consumerNo: number) => {
  const consumer = kafkaClient.consumer({ groupId: uploadProcessorGroup });
  await consumer.connect();
  await consumer.subscribe({ topic: uploadRequestListenTopicName });

  await consumer.run({
    // eslint-disable-next-line @typescript-eslint/require-await
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `startUploadConsumer received a new message number: on consumer#${consumerNo}: `,
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

      let req: IUploadDto;
      try {
        req = JSON.parse(message.value.toString()) as IUploadDto;
        const errorMsg = ValidateUploadRequest(req);

        if (errorMsg.length > 0) {
          console.log('Invalid Message to upload');
          console.error(errorMsg);
          await sendUploadResult(
            new UploadResultDto(
              req.clientId,
              req.correlationId,
              'FAILURE',
              'BAD_REQUEST'
            )
          );
          return;
        }

        const contents = req.contents;
        const fileType = req.fileType;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        const id: string = v4();
        const path = buildImagePath(`${id}.${fileType}`);
        const result = await insertImageMetaData(id, path, fileType);
        await upload(path, contents);

        await sendUploadResult(
          new UploadResultDto(req.clientId, req.correlationId, 'SUCCESS')
        );
        console.log(`Upload Process was completed.`);
      } catch (err) {
        console.log(`Upload Process was failed. Error:`);
        console.error(err);
        await sendUploadResult(
          new UploadResultDto(
            req.clientId,
            req.correlationId,
            'FAILURE',
            'SYSTEM_ERROR'
          )
        );
      }
    }
  });
};
