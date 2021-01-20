export default function atoID(base64) {
  return atob(base64).split(":")[1];
}
