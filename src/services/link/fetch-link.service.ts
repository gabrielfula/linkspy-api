import { LinkRepository } from "../../repositories/link.repository";

export class FetchLinkService {
    private linkRepository: LinkRepository;

    constructor() {
        this.linkRepository = new LinkRepository();
    }
 
    async track(trackCode: string, data: any): Promise<any> {

        const link = await this.linkRepository.findByTrackCode(trackCode);

        if (!link) {
            console.log("retornar erro aqui")
        }

        // TODO: preciso pegar os valores de data.latitude e data.longitude e retornar o state e city

        // TODO: preciso adicionar uma linha nova na model de Location

        
        
        


        return;
    }
 }
 