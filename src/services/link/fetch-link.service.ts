import { Link } from "@prisma/client";
import { HttpError } from "../../errors/exception";
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

    public async index(userId: number): Promise<Link[]>{
        const links = await this.linkRepository.findLinksByUserId(userId);

        return links;
    }

    public async track(data: any, userIp: any): Promise<any> {
        const link = await this.linkRepository.findByTrackCode(data.track);

        if (!link) {
            throw new HttpError("Link informado não foi encontrado!", 400);
        }

        const userAddress = await this.getAddress(data.latitude, data.longitude);

        const location = await this.createLocationService.save(
            data.longitude,
            data.latitude,
            userAddress.address.state,
            userAddress.address.city,
            link.id,
            userIp,
            userAddress.address.postcode,
            userAddress.address.quarter,
            userAddress.address.road
        );

        if (location) {
            return {
                redirectTo: link.original_link,
                locationId: location.uuid, 
            };
        }

        throw new HttpError("Erro ao buscar link", 500);
    }

    public async getLastLinksById(userId: number): Promise<Link[]>{
        const links = await this.linkRepository.findLinksByUserId(userId, 3);

        return links;
    }

    private async getAddress(latitude: string, longitude: string): Promise<any> {
        try {
            const geocoding = new GeocodingIntegration();
            return await geocoding.getCoordinates(latitude, longitude);
        } catch (error) {
            throw new HttpError("Erro ao buscar localização", 500)
        }
    }
}
