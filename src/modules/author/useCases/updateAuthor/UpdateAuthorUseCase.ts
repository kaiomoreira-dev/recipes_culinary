import { Author } from "@modules/author/infra/typeorm/entities/Author";
import { IAuthorRepository } from "@modules/author/repositories/IAuthorRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class UpdateAuthorUseCase {
    constructor(
        @inject("AuthorRepository")
        private authorRepository: IAuthorRepository
    ) {}

    async execute(
        id: string,
        newName?: string,
        whatsapp?: string
    ): Promise<Author> {
        const authorValidator = await this.authorRepository.findById(id);

        if (!authorValidator) {
            throw new AppError("Author not found", 404);
        }

        const newNameValidator = await this.authorRepository.findByName(
            newName
        );

        if (newNameValidator) {
            throw new AppError("Author name already exists", 401);
        }

        const whatsappValidator = await this.authorRepository.findByWhatsapp(
            whatsapp
        );

        if (whatsappValidator) {
            throw new AppError("Author whatsapp already exists", 401);
        }

        const updateAuthor = await this.authorRepository.updateById(
            authorValidator.id,
            newName,
            whatsapp
        );

        return updateAuthor;
    }
}
