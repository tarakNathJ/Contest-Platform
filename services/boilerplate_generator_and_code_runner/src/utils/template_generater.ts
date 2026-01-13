// function parseSignature(signature) {
//   const [left, returnType] = signature.split("->").map(s => s.trim());
//   const match = left.match(/^(\w+)\((.*)\)$/);
//   if (!match) throw new Error("Invalid signature format");

//   const functionName = match[1];
//   const params = match[2]
//     ? match[2].split(",").map(p => {
//         const [name, type] = p.split(":").map(x => x.trim());
//         return { name, type };
//       })
//     : [];

//   return { functionName, params, returnType };
// }

// function generateCode({ signature }) {
//   const { functionName, params, returnType } = parseSignature(signature);
//   const paramNames = params.map(p => p.name).join(", ");

//   const typeParsers = {
//     "int": name => `parseInt(${name})`,
//     "float": name => `parseFloat(${name})`,
//     "string": name => `${name}`,
//     "char": name => `${name}[0]`,
//     "boolean": name => `${name} === 'true'`,
//   };

//   let inputParsing = `
// const rl = readline.createInterface({ input: process.stdin });
// const lines = [];
// for await (const line of rl) {
//     if (line.trim()) lines.push(line.trim());
// }
// let idx = 0;
// `;

//   params.forEach(p => {
//     if (p.type === "char[]") {
//       // Logic for char[]: reads a word and splits it into characters
//       inputParsing += `const ${p.name} = lines[idx++].split("").filter(c => c !== " ");\n`;
//     } else if (p.type.endsWith("[]")) {
//       const baseType = p.type.slice(0, -2);
//       inputParsing += `const ${p.name} = lines[idx++].split(" ").map(x => ${typeParsers[baseType]("x")});\n`;
//     } else {
//       inputParsing += `const ${p.name} = ${typeParsers[p.type](`lines[idx++]`)};\n`;
//     }
//   });

//   // Handle Output: In 2026, void functions usually mean "print the mutated first argument"
//   let outputHandling = "";
//   if (returnType === "void") {
//     const firstParam = params[0]?.name;
//     const isCharArr = params[0]?.type === "char[]";
//     outputHandling = `console.log(${firstParam}.join("${isCharArr ? "" : " "}"));`;
//   } else if (returnType.endsWith("[]")) {
//     const isCharArr = returnType === "char[]";
//     outputHandling = `console.log(result.join("${isCharArr ? "" : " "}"));`;
//   } else {
//     outputHandling = `console.log(result);`;
//   }

//   return `const readline = require("readline");

// // ===== USER FUNCTION =====
// function ${functionName}(${paramNames}) {
//     // write your solution here
// }

// // ===== INPUT & EXECUTION =====
// (async () => {
// ${inputParsing}
// const result = ${functionName}(${paramNames});
// ${outputHandling}
// })();
// `;
// }
// export { generateCode };

type ParamType =
  | "int"
  | "float"
  | "string"
  | "char"
  | "boolean"
  | "char[]"
  | "int[]"
  | "float[]"
  | "string[]";

interface ParsedParam {
  name: string;
  type: ParamType;
}

interface ParsedSignature {
  functionName: string;
  params: ParsedParam[];
  returnType: ParamType | "void";
}

interface GenerateCodeInput {
  signature: string;
}

function parseSignature(signature: string): ParsedSignature {
  const [left, returnType] = signature.split("->").map((s) => s.trim());
 //@ts-ignore
  const match = left.match(/^(\w+)\((.*)\)$/);
  if (!match) throw new Error("Invalid signature format");

  const functionName = match[1];
  const params = match[2]
    ? match[2].split(",").map((p) => {
        const [name, type] = p.split(":").map((x) => x.trim());
        return { name, type: type as ParamType };
      })
    : [];

  //@ts-ignore
  return { functionName, params, returnType: returnType as ParamType | "void" };
}

async function generateCode({ signature }: GenerateCodeInput): Promise<string> {
  const { functionName, params, returnType } = parseSignature(signature);
  const paramNames = params.map((p) => p.name).join(", ");

  const typeParsers: Record<string, (name: string) => string> = {
    int: (name) => `parseInt(${name})`,
    float: (name) => `parseFloat(${name})`,
    string: (name) => `${name}`,
    char: (name) => `${name}[0]`,
    boolean: (name) => `${name} === 'true'`,
  };

  let inputParsing = `
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
for await (const line of rl) {
    if (line.trim()) lines.push(line.trim());
}
let idx = 0;
`;

  params.forEach((p) => {
    if (p.type === "char[]") {
      // Logic for char[]: reads a word and splits it into characters
      inputParsing += `const ${p.name} = lines[idx++].split("").filter(c => c !== " ");\n`;
    } else if (p.type.endsWith("[]")) {
      const baseType = p.type.slice(0, -2);
      //@ts-ignore
      inputParsing += `const ${p.name} = lines[idx++].split(" ").map(x => ${typeParsers[baseType]("x")});\n`;
    } else {
      //@ts-ignore
      inputParsing += `const ${p.name} = ${typeParsers[p.type](`lines[idx++]`)};\n`;
    }
  });

  // Handle Output: In 2026, void functions usually mean "print the mutated first argument"
  let outputHandling = "";
  if (returnType === "void") {
    const firstParam = params[0]?.name;
    const isCharArr = params[0]?.type === "char[]";
    outputHandling = `console.log(${firstParam}.join("${isCharArr ? "" : " "}"));`;
  } else if (returnType.endsWith("[]")) {
    const isCharArr = returnType === "char[]";
    outputHandling = `console.log(result.join("${isCharArr ? "" : " "}"));`;
  } else {
    outputHandling = `console.log(result);`;
  }

  return `const readline = require("readline");

// ===== USER FUNCTION =====
function ${functionName}(${paramNames}) {
    // write your solution here
}

// ===== INPUT & EXECUTION =====
(async () => {
${inputParsing}
const result = ${functionName}(${paramNames});
${outputHandling}
})();
`;
}
export { generateCode };
