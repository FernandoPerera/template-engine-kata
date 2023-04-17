
export class Dictionary {

    private dictionary: Object

    private constructor(dictionary: Object) {
        this.dictionary = dictionary
    }

    static create(dictionary: Object): Dictionary {

        const objectIsEmpty = Object.keys(dictionary).length === 0

        if (objectIsEmpty) { throw new Error('The object cant be empty') }

        return new Dictionary(dictionary)
    }

}
