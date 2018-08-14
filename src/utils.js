export function uuid() {
  const s = () =>
    Math.floor((1 + Math.random()) * 1e5)
      .toString(16)
      .substr(1);
  return `${s() + s()}-${s()}-${s()}-${s() + s() + s()}`;
}
