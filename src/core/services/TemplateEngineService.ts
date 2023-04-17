import { TemplateEngineRepository } from "@core/repositories/TemplateEngineRepository"

export class TemplateEngineService {

    private templateEngineRepository: TemplateEngineRepository

    constructor (templateEngineRepository: TemplateEngineRepository) {
        this.templateEngineRepository = templateEngineRepository
    }

    replaceVariable(text: string, dictionary: Object): string {

        throw new Error('Not implemented yet')

    }

}
