// converts boolean strings to booleans
export function parseBoolean(string:string) {
    return string === "true" ? true : string === "false" ? false : undefined;
  };