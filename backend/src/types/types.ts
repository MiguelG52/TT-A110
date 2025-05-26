export type TransportConfig = {
    host: string,
    port: number,
    secure?: boolean,
    tls?:{
        ciphers:string
    },
    requireTLS?:boolean,
    debug?: boolean,
    connectionTimeout?: number,
    auth: {
        user: string,
        pass: string
    }
}

export type email = {
    name:string,
    email:string,
    token:string
}

export interface RecommendationRequest {
  javaCode: string;  
  focusAreas?: string[]; 
  strictness?: 'low' | 'medium' | 'high';
}
export interface RecommendationResponse {
  recommendations: Recommendation[];
  analysisSummary: string;
  overallScore?: number;
}
export interface Recommendation {
  type: 'improvement' | 'bestPractice' | 'optimization' | 'error' | 'security';
  title: string;
  description: string;
  code?: string; 
  line: number; 
  severity?: 'low' | 'medium' | 'high'; 
}
