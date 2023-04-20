export type ToolType = 'add' | 'select' | 'null';

export class ContextClass {
  static map: Map<string, string> = new Map<string, string>();

  static setMap(newMap: Map<string, string>) {
    ContextClass.map = newMap;
  }

  static getMap(): Map<string, string> {
    const newMap = new Map<string, string>();

    ContextClass.map.forEach((value, key) => newMap.set(key, value));

    return newMap;
  }
}
