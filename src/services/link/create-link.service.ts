import { LinkRepository } from "../../repositories/link.repository";

export class CreateLinkService {
     private linkRepository: LinkRepository;

     constructor() {
          this.linkRepository = new LinkRepository();
     }
 
     async index(data: any, userId: number): Promise<any> {
         const urlData = await this.generateUrl(data.old_url);

         const linkCreated = await this.save(urlData.subdomainUrl, data.old_url, urlData.trackCode, userId);

         return linkCreated;
     }
 
     async generateUrl(url: string): Promise<any> {
          try {
               const hasProtocol = /^https?:\/\//i.test(url);
               const urlObj = new URL(hasProtocol ? url : `https://${url}`);
               
               const domain = this.extractDomain(urlObj.hostname);
     
               const urlData = this.formatUrl(domain, urlObj);
               
               return urlData;
          } catch (error: any) {
               throw new Error(`Erro ao gerar URL: ${error.message}`);
          }
     }
 
     private extractDomain(hostname: string): string {
         const domain = hostname.replace(/^www\./, '');
         return domain;
     }
 
     private generateTrackingCode(): string {
         return Math.random().toString(36).substring(2, 10);
     }

     private formatUrl(domain: string, url: any): object {
          const trackCode = this.generateTrackingCode();

          let subdomainUrl;

          if (process.env.enviroment) {
               subdomainUrl = `http://127.0.0.1:5500/index.html?track=${trackCode}`
          } else {
               subdomainUrl = `https://${domain}.${process.env.BASE_DOMAIN}${url.pathname}${url.searchParams.toString() ? '?' + url.searchParams.toString() : ''}&track=${trackCode}`;
          }

          return {
               trackCode: trackCode,
               subdomainUrl: subdomainUrl
          };
     }

     private async save(newUrl: string, oldUrl: string, track: string, userId: number): Promise<any> {
          const dataToCreate = {
               user_id: userId,
               new_link: newUrl,
               original_link: oldUrl,
               track_code: track
          };

          try {
               return await this.linkRepository.insert(dataToCreate);
               
          } catch (error) {
               console.log('errorrr', error);
          }
     }
}
 