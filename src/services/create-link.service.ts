import { Link } from "@prisma/client";
import { LinkRepository } from "../repositories/link.repository";

export class CreateLinkService {
     private linkRepository: LinkRepository;

     constructor() {
          this.linkRepository = new LinkRepository();
     }
 
     async index(oldUrl: any): Promise<any> {
         const urlData = await this.generateUrl(oldUrl.old_url);

         const linkCreated = await this.save(urlData.subdomainUrl, oldUrl.old_url, urlData.trackCode);

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

          const subdomainUrl = `https://${domain}.link.com${url.pathname}${url.searchParams.toString() ? '?' + url.searchParams.toString() : ''}&track=${trackCode}`;

          return {
               trackCode: trackCode,
               subdomainUrl: subdomainUrl
          };
     }

     private async save(newUrl: string, oldUrl: string, track: string): Promise<Link> {
          const dataToCreate = {
               new_link: newUrl,
               original_link: oldUrl,
               track: track
          };

          return await this.linkRepository.insert(dataToCreate);
     }
}
 