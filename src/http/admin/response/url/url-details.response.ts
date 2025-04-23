export class LinkDetailsSerializer {
     static serialize(data: any) {
          return {
               uuid: data.uuid,
               original_link: data.original_link,
               new_link: data.new_link,
               alias: data.alias,
               created_at: data.created_at,
               location: {
                    last_location: {
                         longitude: data.locations?.[data.locations.length - 1]?.longitude ?? null,
                         latitude: data.locations?.[data.locations.length - 1]?.latitude ?? null,
                         state: data.locations?.[data.locations.length - 1]?.state ?? null,
                         city: data.locations?.[data.locations.length - 1]?.city ?? null,
                         street: data.locations?.[data.locations.length - 1]?.street ?? null,
                         cep: data.locations?.[data.locations.length - 1]?.cep ?? null,
                         neighborhood: data.locations?.[data.locations.length - 1]?.neighborhood ?? null,
                    },
                    locations_history: data.locations || [],
               }
          };
     }
}