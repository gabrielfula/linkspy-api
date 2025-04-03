import { LocationRepository } from "../../repositories/location.repository";

export class CreateLocationService {
     private locationRepository: LocationRepository;

     constructor() {
          this.locationRepository = new LocationRepository();
     }
 
     public async save(longitude: string, latitude: string, state: string, city: string, linkId: number): Promise<any> {
          const dataToCreate = {
               longitude: longitude,
               latitude: latitude,
               city: city,
               state: state,
               link_id: linkId // TODO: criar esse campo referente ao link_id, onde aquela localizaçao refere-se ao location
          };

          try {
               return await this.locationRepository.insert(dataToCreate);
               
          } catch (error) {
               console.log('errorrr', error);
          }
     }
}
 