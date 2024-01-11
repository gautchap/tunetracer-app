export const getTime = (millis: number | null | undefined) => {
    if (!millis) return "-:--";
    const minutes = Math.floor(millis / 60_000);
    const seconds = ((millis % 60_000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
};
