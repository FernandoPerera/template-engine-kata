
export class Dictionary {

    private dictionary: Object

    private constructor(dictionary: Object) {
        this.dictionary = dictionary
    }

    static create(dictionary: Object): Dictionary {

        if (Object.keys(dictionary).length === 0) { throw new Error('The object cant be empty') }

        throw new Error('Not implemented yet')
    }

}
