export type Callback = (args?: any) => void;

export type PayFormCallback = (qilinProductUUID: string, userId: string, itemId: string) => Promise<any>;
