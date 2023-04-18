import { TextToReplace } from '@core/models/TextToReplace';
import { TemplateEngineRepository } from '../repositories/TemplateEngineRepository';
import { Dictionary } from '@core/models/Dictionary'
export class TemplateEngineService implements TemplateEngineRepository {

    replaceVariable(texToReplace: TextToReplace, variableDictionary: Dictionary): string {

        let replacedText = ""
        let variableText = texToReplace.getTextToReplace()
        const dictionary: Object = variableDictionary.getDictionary()

        const wrongKeys: Array<{}> = []

        Object.keys(dictionary).forEach(key => {

            const value = dictionary[key]
            const variableToSearch = "${" + key + "}"

            if (variableText.includes(variableToSearch)) {
                replacedText = variableText.replace(variableToSearch, value)
                variableText = replacedText
            } else {
                wrongKeys.push({wrongKey: key, reason: 'variable dont exist in text'})
            }

        })

        if ( wrongKeys.length > 0 ) {
            console.warn('warning : ' + JSON.stringify(wrongKeys).replace(/\"/gi, ''))
        } 

        return replacedText

    }

}
