export const uuid = () => self.crypto.randomUUID();
export const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
export const randColor = () => `rgb(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)})`;
export const randBool = () => Math.random() < 0.5;
export const shortId = () => Math.random().toString(36).slice(2);