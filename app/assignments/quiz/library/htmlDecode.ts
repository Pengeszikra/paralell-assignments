export const htmlDecode = (input:string):string => {
  const doc = new global.DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}
