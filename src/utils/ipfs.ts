import { IpfsFileUploadResponse, IpfsPinListResponse } from '@/schema';

export const uploadToIpfs = async (file: File): Promise<IpfsFileUploadResponse | null> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const metadata = JSON.stringify({
      name: file.name,
    });
    formData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append('pinataOptions', options);

    const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
      },
      body: formData,
    });
    const data = await res.json();
    console.log(`File upload to IPFS`, data);
    return IpfsFileUploadResponse.parse(data);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const listIpfsFiles = async (): Promise<IpfsPinListResponse> => {
  try {
    const res = await fetch('https://api.pinata.cloud/data/pinList?status=pinned', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
      },
    });
    const data = await res.json();
    return IpfsPinListResponse.parse(data);
  } catch (error) {
    console.error(error);
    return {
      count: 0,
      rows: [],
    };
  }
};
