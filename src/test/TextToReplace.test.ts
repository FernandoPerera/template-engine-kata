import { TextToReplace } from '../core/models/TextToReplace';

/*
 *  ''                  ->   error response
 *  'text to remplace'  ->  'text to remplace'
*/

describe('Text to replace test', () => {

    it('should error response if the text is empty', () => {

        expect( () => TextToReplace.create('') ).toThrow('The text to replace cant be empty')

    })

    it('should return same text if the text is not empty', () => {

        const textToReplace: TextToReplace = TextToReplace.create('text to replace')

        expect(textToReplace).toBe(textToReplace)

    })

})
