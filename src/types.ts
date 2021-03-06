export type Callback = (args?: any) => void;

export interface PayFormCallbackProps {
  qilinProductUUID: string;
  userId: string;
  itemId: string;
}

export type PayFormCallback = (props: PayFormCallbackProps) => Promise<any>;

export interface HostInitProps {
  qilinProductUUID: string;
  apiURL: string;
  meta?: any;
}

export interface GameInitProps {
  qilinProductUUID: string;
  apiURL: string;
  meta?: any;
  onAuth?: AuthFunction;
}

export interface ProxyInitProps {
  apiURL: string;
  meta?: any;
}

export interface AuthFunctionProps {
  url: string;
  meta: any;
  qilinProductUUID?: string;
}

export type AuthFunction = (props: AuthFunctionProps) => Promise<any>;
