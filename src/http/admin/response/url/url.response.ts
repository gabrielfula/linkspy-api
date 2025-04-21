export class LinkSerializer {
     static serialize(data: any) {
          return {
               uuid: data.uuid,
               original_link: data.original_link,
               new_link: data.new_link,
               alias: data.alias
          };
     }
}