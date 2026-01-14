export const judge0Ids : { [key: string]: number } = {
  asm: 45,
  bash: 46,
  c: 54,
  cpp: 53,
  csharp: 51,
  go: 60,
  java: 62,
  js: 63,
  kotlin: 78,
  py3: 71,
  ruby: 72,
  rust: 73,
  sql: 82,
  swift: 83,
  ts: 74,
  multi: 89,
};

export function extractUserFunction(code :string) : string | null {
  const startMarker = "// ===== USER FUNCTION =====";
  const endMarker = "// ===== INPUT & EXECUTION =====";
  const startIdx = code.indexOf(startMarker);
  const endIdx = code.indexOf(endMarker);
  if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
    return null; 
  }

  const actualStart = startIdx + startMarker.length;

  const extracted = code.slice(actualStart, endIdx).trim();

  return  extracted ;
}


export function joingUserFunction(code:string, userFunction: string) : string | null {
  const startMarker = "// ===== USER FUNCTION =====";
  const endMarker = "// ===== INPUT & EXECUTION =====";
  const startIdx = code.indexOf(startMarker);
  const endIdx = code.indexOf(endMarker);
  
  if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
    return null; 
  }

  const actualStart = startIdx + startMarker.length;
  
  const extracted = code.slice(0, actualStart) + userFunction + code.slice(endIdx);

  return extracted;
}