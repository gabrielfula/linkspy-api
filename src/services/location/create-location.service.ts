import { LinkRepository } from "../../repositories/link.repository";

export class CreateLocationService {
     private linkRepository: LinkRepository;

     constructor() {
          this.linkRepository = new LinkRepository();
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
 