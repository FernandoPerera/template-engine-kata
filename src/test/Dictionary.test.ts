import { Dictionary } from '../core/models/Dictionary';

/*
 *  {  }    ->      error Response
 *  { test: 'prueba' }      ->      same object
*/

describe('Dictionary test', () => {

    it('should return error response if object is empty', () => {

        expect( () => Dictionary.create({}) ).toThrow('The object cant be empty')

    })

})
