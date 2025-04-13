import { HttpError } from "../../errors/exception";
import { removePontuation } from "../../helpers/helper";
import { LocationRepository } from "../../repositories/location.repository";

export class CreateLocationService {
     private locationRepository: LocationRepository;

     constructor() {
          this.locationRepository = new LocationRepository();
     }
 
     public async save(
          longitude: string, 
          latitude: string, 
          state: string, 
          city: string, 
          linkId: number, 
          ipAddress: string,
          cep: string,
          neighborhood: string,
          street: string,
     ): Promise<any> {
          const dataToCreate = {
               longitude:     longitude.toString(),
               latitude:      latitude.toString(),
               city:          city,
               state:         state,
               ip_address:    ipAddress,
               link_id:       linkId,
               cep:           removePontuation(cep),
               neighborhood:  neighborhood,
               street:        street
          };

          try {
               const location = await this.locationRepository.insert(dataToCreate);

               return location;
          } catch (error) {
               throw new HttpError("Erro ao criar localização", 500);
          }
     }
}
 