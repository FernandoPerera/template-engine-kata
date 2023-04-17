import { TextToReplace } from '@core/models/TextToReplace';
import { TemplateEngineRepository } from '../repositories/TemplateEngineRepository';
import { Dictionary } from '@core/models/Dictionary';

export class TemplateEngineService implements TemplateEngineRepository {

    replaceVariable(texToReplace: TextToReplace, variableDictionary: Dictionary): string {

        const key = Object.keys(variableDictionary.getDictionary())
        const value = variableDictionary.getDictionary()[key[0]]

        return texToReplace.getTextToReplace().replace("${" + key + "}", value)

    }

}
