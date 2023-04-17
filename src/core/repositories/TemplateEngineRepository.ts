import { Dictionary } from "@core/models/Dictionary";
import { TextToReplace } from "@core/models/TextToReplace";

export interface TemplateEngineRepository {

    replaceVariable(texToReplace: TextToReplace, variableDictionary: Dictionary): string 

}
