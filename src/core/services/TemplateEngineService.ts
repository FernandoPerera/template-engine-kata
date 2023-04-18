import { TextToReplace } from '@core/models/TextToReplace';
import { TemplateEngineRepository } from '../repositories/TemplateEngineRepository';
import { Dictionary } from '@core/models/Dictionary'
export class TemplateEngineService implements TemplateEngineRepository {

    replaceVariable(texToReplace: TextToReplace, variableDictionary: Dictionary): string {

        let replacedText = ""
        let variableText = texToReplace.getTextToReplace()
        const dictionary: Object = variableDictionary.getDictionary()

        const wrongKeys: Array<{}> = []

        const variableList = variableText.match(/\${\w*}/g)

        variableList.forEach(textKey => {

            textKey = textKey.replace(/\${|}/g, '')

            if (!Object.keys(dictionary).includes(textKey)) {
                wrongKeys.push({ wrongKey: textKey, reason: 'variable dont exist in dictionary' })
            }

        })


        Object.keys(dictionary).forEach(key => {

            const value = dictionary[key]
            const variableToSearch = "${" + key + "}"

            if (!this.isSerializable(value)) {

                wrongKeys.push({ wrongKey: key, reason: 'variable is not serializable' })

            } else if (variableText.includes(variableToSearch)) {

                replacedText = variableText.replace(variableToSearch, value)
                variableText = replacedText
              
            } else {
                wrongKeys.push({ wrongKey: key, reason: 'variable dont exist in text' })
            }

        })

        this.checkLengthFrom(wrongKeys)

        return replacedText

    }

    private checkLengthFrom(wrongKeys: Array<{}>) {

        if (wrongKeys.length > 0) {
            console.warn('warning : ' + JSON.stringify(wrongKeys).replace(/\"/gi, ''))
        }

    }

    private isSerializable(value: any): boolean {

        return (typeof value === 'string' || typeof value === 'boolean' || typeof value === 'number')

    }

}
