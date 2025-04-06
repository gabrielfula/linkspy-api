import { GeocodingIntegration } from "../../integrations/geocoding";
import { LinkRepository } from "../../repositories/link.repository";
import { CreateLocationService } from "../location/create-location.service";

export class FetchLinkService {
    private linkRepository: LinkRepository;
    private createLocationService: CreateLocationService;

    constructor() {
        this.linkRepository = new LinkRepository();
        this.createLocationService = new CreateLocationService();
    }

    public async track(trackCode: string, data: any, userIp: any): Promise<any> {
        const link = await this.linkRepository.findByTrackCode(trackCode);

        if (!link) {
            console.log("retornar erro aqui");
            return
        }

        const address = await this.getAddress(data.latitude, data.longitude);

        /* Mock com valores enquando a integraçao nao esta completa */
        // TODO: estudar as rotas corretamente da integradora
        const mockAddress = {
            longitude: data.longitude,
            latitude: data.latitude,
            city: "Campinas",
            state: "SP",
        };

        const location = await this.createLocationService.save(
            data.longitude,
            data.latitude,
            mockAddress.state,
            mockAddress.city,
            link.id,
            userIp,
        );

        if (location) {
            return {
                redirectTo: link.original_link,
                locationId: location.uuid, 
            };
        }

        return { error: "Falha ao criar localização" };
    }

    public async getLastLinksById(userId: number): Promise<any>{
        const links = await this.linkRepository.findLastThreeLinksByUserId(userId);

        return links;
    }

    private async getAddress(latitude: string, longitude: string): Promise<any> {
        try {
            const geocoding = new GeocodingIntegration();
            return await geocoding.getCoordinates(latitude, longitude);
        } catch (error) {
            console.error("Erro ao obter coordenadas:", error);
            return null;
        }
    }
}
