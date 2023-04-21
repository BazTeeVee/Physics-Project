export type ToolType = 'add' | 'select' | 'null';

export class ContextClass {
  static map: Map<string, string> = new Map<string, string>();
  static toolType: ToolType = 'null';

  static setMap(newMap: Map<string, string>) {
    ContextClass.map = newMap;
  }

  static getMap(): Map<string, string> {
    const newMap = new Map<string, string>();

    ContextClass.map.forEach((value, key) => newMap.set(key, value));

    return newMap;
  }

  static setToolType(toolType: ToolType) {
    if (ContextClass.toolType === toolType) {
      ContextClass.toolType = 'null';
    } else {
      ContextClass.toolType = toolType;
    }
  }

  static getToolType(): ToolType {
    return ContextClass.toolType;
  }
}
