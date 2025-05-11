export default function getPath(filePath) {
  if (filePath.length === 0) return "~/";
  if (filePath.length === 1) return "~/" + filePath[0];
  return "~" + filePath.reduce((a, b) => "" + a + "/" + b);
}
