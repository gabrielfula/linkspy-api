export class LinkDetailsSerializer {
     static serialize(url: any) {
          return {
               uuid: url.uuid,
               original_link: url.original_link,
               new_link: url.new_link,
               alias: url.alias,
               created_at: url.created_at,
               location: {
                    last_location: {
                         longitude: url.locations[url.locations.length - 1].longitude,
                         latitude: url.locations[url.locations.length - 1].latitude,
                         state: url.locations[url.locations.length - 1].state,
                         city: url.locations[url.locations.length - 1].city,
                         street: url.locations[url.locations.length - 1].street,
                    },
                    locations_history: url.locations
               }
          };
     }
}