export class LinkDetailsSerializer {
     static serialize(url: any) {
          return {
               uuid: url.uuid,
               original_link: url.original_link,
               new_link: url.new_link,
               alias: url.alias,
               created_at: url.created_at
          };
     }
}