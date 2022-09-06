/* eslint-disable prefer-const */
import { ICreateEmailDTO } from "@modules/author/dtos/ICreateEmailDTO";
import { Email } from "@modules/author/infra/typeorm/entities/Email";

import { IEmailRepository } from "../IEmailRepository";

export class EmailRepositoryInMemory implements IEmailRepository {
    private emailsRepository: Email[] = [];

    async findById(id: string): Promise<Email> {
        return this.emailsRepository.find((email) => email.id === id);
    }
    async updateById(id: string, newE_mail: string): Promise<Email> {
        const emailIndex = this.emailsRepository.findIndex(
            (email) => email.id === id
        );

        this.emailsRepository[emailIndex].e_mail = newE_mail;

        const emailUpdated = this.emailsRepository.find(
            (email) => email.id === id
        );

        return emailUpdated;
    }

    async deleteById(id: string): Promise<void> {
        const emailIndex = this.emailsRepository.findIndex(
            (email) => email.id === id
        );

        this.emailsRepository.splice(emailIndex, 1);
    }

    async create({ id, e_mail, author_id }: ICreateEmailDTO): Promise<Email> {
        const email = new Email();

        Object.assign(email, {
            id,
            e_mail,
            author_id,
        });

        this.emailsRepository.push(email);

        return email;
    }
    async list(): Promise<Email[]> {
        return this.emailsRepository;
    }
    async findByEmail(email: string): Promise<Email> {
        return this.emailsRepository.find((eMail) => eMail.e_mail === email);
    }
}
