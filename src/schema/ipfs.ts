import * as z from 'zod';

export type IpfsPinItem = z.infer<typeof IpfsPinItem>;
export const IpfsPinItem = z.object({
  id: z.string(),
  ipfs_pin_hash: z.string(),
});

export type IpfsPinListResponse = z.infer<typeof IpfsPinListResponse>;
export const IpfsPinListResponse = z.object({
  count: z.number(),
  rows: z.array(IpfsPinItem),
});

export type IpfsFileUploadResponse = z.infer<typeof IpfsFileUploadResponse>;
export const IpfsFileUploadResponse = z.object({
  IpfsHash: z.string(),
  PinSize: z.number(),
  Timestamp: z.string(),
});
