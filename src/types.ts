export type Callback = () => void;

export type PayFormCallback = (gameUid: string, userId: string, itemId: string) => Promise<any>;
