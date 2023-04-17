
export class TextToReplace {

    private textToReplace: string

    private constructor(textToReplace: string){
        this.textToReplace = textToReplace
    }

    static create(textToReplace: string): TextToReplace {

        throw new Error('Not implemented yet') 
    }

}
