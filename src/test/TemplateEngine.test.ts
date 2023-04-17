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
 *  'this is a ${variable} for ${variable2}'  |  { variable: 'text', variable2: null }
 *               - 'this is a text for ${variable2}     [warning]
 * 
 *  'this is a ${variable} for ${variable2}'  |  { variable: 'text', variable3: 'example' }
 *               - 'this is a text for ${variable2}     [warning]
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

})
