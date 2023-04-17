import { TextToReplace } from '../core/models/TextToReplace'

/*
 *  ''                  ->   error response
 *  'text to remplace'  ->  'text to remplace'
*/

describe('Text to replace test', () => {

    it('should error response if the text is empty', () => {

        const textToReplace = TextToReplace.create('')

        expect( () => textToReplace ).toThrow('The text to replace cant be empty')

    })

})
