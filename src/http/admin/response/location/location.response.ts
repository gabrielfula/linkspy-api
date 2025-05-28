export class LocationSerializer {
     static serialize(data: any) {
          return {
               uuid: data.uuid,
               state: data.state,
               neighborhood: data.neighborhood,
               longitude: data.longitude,
               latitude: data.latitude,
               ip_address: data.ip_address,
               city: data.city,
               cep: data.cep,
               street: data.street,
          };
     }
}