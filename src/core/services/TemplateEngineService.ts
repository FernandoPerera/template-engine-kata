import { TextToReplace } from '@core/models/TextToReplace';
import { TemplateEngineRepository } from '../repositories/TemplateEngineRepository';
import { Dictionary } from '@core/models/Dictionary'
export class TemplateEngineService implements TemplateEngineRepository {

    replaceVariable(texToReplace: TextToReplace, variableDictionary: Dictionary): string {

        let replacedText: string = ""
        let variableText: string = texToReplace.getTextToReplace()
        const dictionary: Object = variableDictionary.getDictionary()

        const wrongKeys: Array<{}> = []

        this.checkTextVariables(wrongKeys, variableText, dictionary)

        Object.keys(dictionary).forEach(key => {

            const value: string = dictionary[key]
            const variableToSearch: string = "${" + key + "}"

            const isNotSerializable: boolean = !this.isSerializable(value)
            const textToReplaceIncludeVariable: boolean = variableText.includes(variableToSearch)

            if (isNotSerializable) {

                this.addWrongKey(wrongKeys, key, 'variable is not serializable')

            } else if (textToReplaceIncludeVariable) {

                replacedText = variableText.replace(variableToSearch, value)
                variableText = replacedText
              
            } else {
                this.addWrongKey(wrongKeys, key, 'variable dont exist in text')
            }

        })

        this.checkLengthFrom(wrongKeys)

        return replacedText
    }

    private checkLengthFrom(wrongKeys: Array<{}>): void {

        const existWarnings: boolean = wrongKeys.length > 0

        if (existWarnings) {
            console.warn('warning : ' + JSON.stringify(wrongKeys).replace(/\"/gi, ''))
        }
    }

    private isSerializable(value: any): boolean {

        return (typeof value === 'string' || typeof value === 'boolean' || typeof value === 'number')
    }

    private checkTextVariables(wrongKeys: Array<{}>, variableText: string, dictionary: Object): void {

        const variableList: Array<string> = variableText.match(/\${\w*}/g)

        variableList.forEach(textKey => {

            textKey = textKey.replace(/\${|}/g, '')

            const variableDontExistInDictionary: boolean = !Object.keys(dictionary).includes(textKey)

            if (variableDontExistInDictionary) {
                this.addWrongKey(wrongKeys, textKey, 'variable dont exist in dictionary')
            }

        })
    }

    private addWrongKey(wrongKey: Array<{}>, key: string, message: string): void {

        wrongKey.push({ wrongKey: key, reason: message })
    }

}
