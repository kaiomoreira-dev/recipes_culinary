import { IEmailRepository } from "@modules/author/repositories/IEmailRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteEmailUseCase {
    constructor(
        @inject("EmailRepository")
        private emailRepository: IEmailRepository
    ) {}
}
