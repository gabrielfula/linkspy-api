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

     public async getCoordinates(lat: string, lon: string) {
          // return this.makeRequest(`/reverse?lat=${lat}&lon=${lon}&key=${process.env.GEOCODING_API_KEY}`);
     }
}