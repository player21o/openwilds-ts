type InnerPackets = { [key: string]: (...args: any[]) => void };

export default {
  pointer: (x: number, y: number) => {},
} as InnerPackets;
