
export class TextToReplace {

    private textToReplace: string

    private constructor(textToReplace: string){
        this.textToReplace = textToReplace
    }

    static create(textToReplace: string): TextToReplace {

        const textIsEmpty = textToReplace == ''

        if (textIsEmpty) { throw new Error('The text to replace cant be empty') }

        throw new Error('Not implemented yet')
    }

}
