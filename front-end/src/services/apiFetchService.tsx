import IContentDto from 'dto/interface/IContentDto';
import IImageListDto from 'dto/interface/IImageListDto';
import IQueueResultDto from 'dto/interface/IQueueResultDto';
import IUploadDto from 'dto/interface/IUploadDto';

const host = 'http://localhost:8000/images';

const buildUploadDto = (
  clientId: string,
  correlationId: string,
  contents: string
): IUploadDto => ({
  clientId,
  correlationId,
  fileType: 'png',
  contents
});

const buildDownloadUrl = (id: string) => `${host}/${id}/download`;

const fetchGetApi = async (url: string) => {
  const res = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) {
    throw Error();
  }
  return res;
};

const fetchPostApi = async (url: string, body: IUploadDto) => {
  const res = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    throw Error();
  }
  return res;
};

export const callUploadApi = async (
  clientId: string,
  correlationId: string,
  content: string
) => {
  const body: IUploadDto = buildUploadDto(clientId, correlationId, content);
  try {
    const res = await fetchPostApi(host, body);
    return (await res.json()) as IQueueResultDto;
  } catch (_) {
    throw Error();
  }
};

export const callDownloadApi = async (id: string) => {
  const url = buildDownloadUrl(id);
  try {
    const res = await fetchGetApi(url);
    return (await res.json()) as IContentDto;
  } catch (_) {
    throw Error();
  }
};

export const callGetImageListApi = async () => {
  try {
    const res = await fetchGetApi(host);
    return (await res.json()) as IImageListDto;
  } catch (_) {
    throw Error();
  }
};
