import { TextToReplace } from '@core/models/TextToReplace';
import { TemplateEngineRepository } from '../repositories/TemplateEngineRepository';
import { Dictionary } from '@core/models/Dictionary'
export class TemplateEngineService implements TemplateEngineRepository {

    replaceVariable(texToReplace: TextToReplace, variableDictionary: Dictionary): string {

        let replacedText = ""
        let variableText = texToReplace.getTextToReplace()
        const dictionary: Object = variableDictionary.getDictionary()

        Object.keys(dictionary).forEach(key => {
            const value = dictionary[key]
            replacedText = variableText.replace("${" + key + "}", value)
            variableText = replacedText
        })

        return replacedText

    }

}
