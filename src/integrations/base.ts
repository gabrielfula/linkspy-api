export abstract class Base {
     protected abstract getUrlIntegration(): string;
     protected abstract setHeadersConfiguration(): Record<string, string>;
   
     public async makeRequest(endpoint: string, method: "GET" | "POST" = "GET", body?: any) {
          const url = `${this.getUrlIntegration()}${endpoint}`;
          const headers = this.setHeadersConfiguration();
     
          const options: RequestInit = {
               method,
               headers,
          };
     
          if (body && method !== "GET") {
               options.body = JSON.stringify(body);
          }
     
          try {
               const response = await fetch(url, options);
               return await response.json();
          } catch (error) {
               throw error;
          }
     }
   }
   