
export class TextToReplace {

    private textToReplace: string

    private constructor(textToReplace: string){
        this.textToReplace = textToReplace
    }

    static create(textToReplace: string): TextToReplace {

        const textIsEmpty = textToReplace == ''

        if (textIsEmpty) { throw new Error('The text to replace cant be empty') }

        return new TextToReplace(textToReplace)
    }

    getTextToReplace(): string {
        return this.textToReplace
    }

}
