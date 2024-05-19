import {
    quicktype,
    InputData,
    jsonInputForTargetLanguage,
} from "quicktype-core";
const targetLanguage = 'ts'
async function qtRuner( typeName, jsonString) {
    const jsonInput = jsonInputForTargetLanguage(targetLanguage);
    await jsonInput.addSource({
        name: typeName,
        samples: [jsonString],
        
    });

    const inputData = new InputData();
    inputData.addInput(jsonInput);

    const res =  await quicktype({
        inputData,
        lang: targetLanguage,
        rendererOptions: {
            'just-types': true,
            'runtime-typecheck': false,
          },
    });

    return res.lines.join('\n')
}





export default qtRuner