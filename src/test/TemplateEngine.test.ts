import { TextToReplace } from '../core/models/TextToReplace';
import { Dictionary } from '../core/models/Dictionary';
import { TemplateEngineService } from '../core/services/TemplateEngineService';

/*
 *  'this is a ${variable} for example' |  { variable: 'text' }
 *               - 'this is a text for example'
 * 
 *  'this is a ${variable} for ${variable2}'  |  { variable: 'text', variable2: 'example' }
 *               - 'this is a text for example'
 * 
 * 'this is a ${variable} for ${variable2}'  |  { variable: 'text', variable3: 'example' }
 *               - 'this is a text for ${variable2}'     [warning]
 * 
 *  'this is a ${variable} for ${variable2}'  |  { variable: 'text', variable2: undefined }
 *               - 'this is a text for ${variable2}'     [warning]
 * 
 * 'this is a ${variable} for ${variable2} and ${variable4}'  |  { variable: 'text', variable2: null, variable4: 'learn', variable7: 'test' }
 *               - 'this is a text for ${variable2} and learn'     [warning]
 * 
 * * 'this is a ${variable} for ${variable2} and ${variable4}'  |  { variable: 'text', variable2: 'example' }
 *               - 'this is a text for ${variable2} and learn'     [warning]
*/

describe('Template engine test', () => {

    const templateEngineService: TemplateEngineService = new TemplateEngineService()

    it('should return the same text with the variable changed if the text and dictionary its correct', () => {

        const textToReplace: TextToReplace = TextToReplace.create('this is a ${variable} for example')
        const variableDictionary: Dictionary = Dictionary.create({ variable: 'text' })
        const expectedRespose: string = 'this is a text for example'

        const result: string = templateEngineService.replaceVariable(textToReplace, variableDictionary)

        expect(result).toBe(expectedRespose)

    })

    it('should return the same text with the multiple variables changed if the text and dictionary its correct', () => {

        const textToReplace: TextToReplace = TextToReplace.create('this is a ${variable} for ${variable2}')
        const variableDictionary: Dictionary = Dictionary.create({ variable: 'text', variable2: 'example' })
        const expectedRespose: string = 'this is a text for example'

        const result: string = templateEngineService.replaceVariable(textToReplace, variableDictionary)

        expect(result).toBe(expectedRespose)

    })

    it('should return warning if the variable dont exist in text', () => {

        const warn = jest.spyOn(console, "warn").mockImplementation(() => {})
        const textToReplace: TextToReplace = TextToReplace.create('this is a ${variable} for ${variable2}')
        const variableDictionary: Dictionary = Dictionary.create({ variable: 'text', variable2: "example", variable7: 'dont exist' })
        const expectedRespose: string = 'this is a text for example'
        const expectedWarning: string = "warning : [{wrongKey:variable7,reason:variable dont exist in text}]"

        const result: string = templateEngineService.replaceVariable(textToReplace, variableDictionary)

        expect(warn).toBeCalledWith(expectedWarning)
        expect(result).toBe(expectedRespose)

        warn.mockReset();

    })

    it('should return warning if the variable of dictionary is not serializable', () => {

        const warn = jest.spyOn(console, "warn").mockImplementation(() => {})
        const textToReplace: TextToReplace = TextToReplace.create('this is a ${variable} for ${variable2}')
        const variableDictionary: Dictionary = Dictionary.create({ variable: 'text', variable2: undefined})
        const expectedRespose: string = 'this is a text for ${variable2}'
        const expectedWarning: string = "warning : [{wrongKey:variable2,reason:variable is not serializable}]"

        const result: string = templateEngineService.replaceVariable(textToReplace, variableDictionary)

        expect(warn).toBeCalledWith(expectedWarning)
        expect(result).toBe(expectedRespose)

        warn.mockReset()

    })

    it('should return multiple warning if the variable of dictionary is not serializable and if other variable dont exist in text', () => {

        const warn = jest.spyOn(console, "warn").mockImplementation(() => {})
        const textToReplace: TextToReplace = TextToReplace.create('this is a ${variable} for ${variable2} and ${variable4}')
        const variableDictionary: Dictionary = Dictionary.create({ variable: 'text', variable2: null, variable4: 'learn', variable7: 'test' })
        const expectedRespose: string = 'this is a text for ${variable2} and learn'
        const expectedWarning: string = "warning : [{wrongKey:variable2,reason:variable is not serializable},{wrongKey:variable7,reason:variable dont exist in text}]"

        const result: string = templateEngineService.replaceVariable(textToReplace, variableDictionary)

        expect(warn).toBeCalledWith(expectedWarning)
        expect(result).toBe(expectedRespose)

        warn.mockReset()

    })

    it('should return warning if the variable of text dont exist in the dictionary', () => {

        const warn = jest.spyOn(console, "warn").mockImplementation(() => {})
        const textToReplace: TextToReplace = TextToReplace.create('this is a ${variable} for ${variable2} and ${variable4}')
        const variableDictionary: Dictionary = Dictionary.create({ variable: 'text', variable2: 'example' })
        const expectedRespose: string = 'this is a text for example and ${variable4}'
        const expectedWarning: string = "warning : [{wrongKey:variable4,reason:variable dont exist in dictionary}]"

        const result: string = templateEngineService.replaceVariable(textToReplace, variableDictionary)

        expect(warn).toBeCalledWith(expectedWarning)
        expect(result).toBe(expectedRespose)

        warn.mockReset()

    })

})
