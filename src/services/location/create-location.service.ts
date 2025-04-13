import { HttpError } from "../../errors/exception";
import { LocationRepository } from "../../repositories/location.repository";

export class CreateLocationService {
     private locationRepository: LocationRepository;

     constructor() {
          this.locationRepository = new LocationRepository();
     }
 
     public async save(longitude: string, latitude: string, state: string, city: string, linkId: number, ipAddress: any): Promise<any> {
          const dataToCreate = {
               longitude:  longitude.toString(),
               latitude:   latitude.toString(),
               city:       city,
               state:      state,
               ip_address: ipAddress,
               link_id:    linkId // TODO: criar esse campo referente ao link_id, onde aquela localizaçao refere-se ao location
          };

          try {
               const location = await this.locationRepository.insert(dataToCreate);

               return location;
          } catch (error) {
               throw new HttpError("Erro ao criar localização", 500);
          }
     }
}
 