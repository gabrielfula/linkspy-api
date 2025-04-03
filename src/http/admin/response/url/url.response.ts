export class LinkSerializer {
     static serialize(user: any) {
          return {
               original_link: user.original_link,
               new_link: user.new_link,
          };
     }
}