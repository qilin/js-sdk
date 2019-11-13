export type Callback = (args?: any) => void;

export interface PayFormCallbackProps {
  qilinProductUID: string;
  userId: string;
  itemId: string;
}

export type PayFormCallback = (props: PayFormCallbackProps) => Promise<any>;

export interface HostInitProps {
  qilinProductUID: string;
  apiURL: string;
  meta?: any;
}

export interface GameInitProps {
  qilinProductUID: string;
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
  qilinProductUID?: string;
}

export type AuthFunction = (props: AuthFunctionProps) => Promise<any>;
