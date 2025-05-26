import { HttpError } from "../../errors/exception";
import { LinkRepository } from "../../repositories/link.repository";

export class CreateLinkService {
     private linkRepository: LinkRepository;

     constructor() {
          this.linkRepository = new LinkRepository();
     }
 
     async index(data: any, userId: number): Promise<any> {
         const urlData = await this.generateUrl(data.old_url);

         const linkCreated = await this.save(urlData.subdomainUrl, data.old_url, urlData.trackCode, userId, data.alias);

         return linkCreated;
     }
 
     async generateUrl(url: string): Promise<any> {
          try {
               const hasProtocol = /^https?:\/\//i.test(url);
               const urlObj = new URL(hasProtocol ? url : `https://${url}`);
               
               const domain = this.extractDomain(urlObj.hostname);
     
               const urlData = await this.formatUrl(domain, urlObj);
               
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

     private async formatUrl(domain: string, url: any): Promise<object> {
          const trackCode        = this.generateTrackingCode();
          const domainWithoutDot = await this.extractMainDomain(domain);
          const hasSearchParams  = url.searchParams.toString().length > 0;
          const search           = hasSearchParams ? `?${url.searchParams.toString()}` : '';
          const joiner           = hasSearchParams ? '&' : '?';
          const isDev            = process.env.enviroment === 'development';

          const subdomainUrl     = isDev
               ? `${domainWithoutDot}.${process.env.BASE_DOMAIN}${search}${joiner}track=${trackCode}:5173`
               : `https://${domainWithoutDot}.${process.env.BASE_DOMAIN}${url.pathname}${search}${joiner}track=${trackCode}`;

          return {
               trackCode,
               subdomainUrl
          };
     }

     private async extractMainDomain(domain: string): Promise<string> {
          try {
          const normalized = domain.startsWith("http://") || domain.startsWith("https://")
               ? domain
               : `https://${domain}`;

          const parsedUrl = new URL(normalized);
          const hostname = parsedUrl.hostname.replace(/^www\./, "");

          const parts = hostname.split(".");
          const tld = parts[parts.length - 1];
          const secondLevel = parts[parts.length - 2];

          const commonTLDs = ["com", "net", "org", "app", "gov", "edu", "io", "dev", "co"];

          if (commonTLDs.includes(tld)) {
               return secondLevel;
          }

          return `${secondLevel}${tld}`;
          } catch {
               return "";
          }
     }


     private async save(newUrl: string, oldUrl: string, track: string, userId: number, alias: string): Promise<any> {
          const dataToCreate = {
               user_id: userId,
               new_link: newUrl,
               original_link: oldUrl,
               track_code: track,
               alias: alias,
          };

          try {
               return await this.linkRepository.insert(dataToCreate);
               
          } catch (error) {
               throw new HttpError("Não foi possível criar o link", 400);
          }
     }
}
 