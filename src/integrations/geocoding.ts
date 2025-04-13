import { Base } from "./base";

export class GeocodingIntegration extends Base {
     private readonly baseUrl: string = process.env.GEOCODING_URL!;

     protected getUrlIntegration(): string {
          return this.baseUrl;
     }

     protected setHeadersConfiguration(): Record<string, string> {
          return {
               "Accept": "application/json",
          };
     }

     public async getCoordinates(latitude: string, longitude: string) {
          return this.makeRequest(`reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
     }
}