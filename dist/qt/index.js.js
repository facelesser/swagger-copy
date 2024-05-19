import __vite__cjsImport0_quicktypeCore from "/vendor/.vite-deps-quicktype-core.js__v--40e1e05f.js"; const quicktype = __vite__cjsImport0_quicktypeCore["quicktype"]; const InputData = __vite__cjsImport0_quicktypeCore["InputData"]; const jsonInputForTargetLanguage = __vite__cjsImport0_quicktypeCore["jsonInputForTargetLanguage"]



;
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