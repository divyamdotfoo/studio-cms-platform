import config from "@payload-config";
import { getPayload, type Payload } from "payload";

type GlobalWithPayload = typeof globalThis & {
  __payloadClientPromise?: Promise<Payload>;
};

const globalWithPayload = globalThis as GlobalWithPayload;

export const getPayloadClient = async () => {
  if (!globalWithPayload.__payloadClientPromise) {
    globalWithPayload.__payloadClientPromise = getPayload({ config });
  }

  return globalWithPayload.__payloadClientPromise;
};
