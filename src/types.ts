export type Callback = (args?: any) => void;

export type PayFormCallback = (gameUid: string, userId: string, itemId: string) => Promise<any>;
