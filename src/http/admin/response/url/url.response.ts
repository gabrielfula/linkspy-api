import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

export class LinkSerializer {
     static serialize(data: any) {
          return {
               uuid: data.uuid,
               original_link: data.original_link,
               new_link: data.new_link,
               alias: data.alias,
               date: formatDistanceToNow(new Date(data.created_at), {
                    addSuffix: true,
                    locale: ptBR,
               }),
          };
     }
}