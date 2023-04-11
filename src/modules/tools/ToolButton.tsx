import { ToolType } from '@/Types';
import React from 'react';

interface ToolProps {
  toolType: ToolType;
  setTool: (tool: ToolType) => void;
  [rest: string]: any;
}

function toolToString(toolType: ToolType): string {
  if (toolType === 'add') return 'Add';
  if (toolType === 'step') return 'Step';

  return '[ERROR] NO TOOL TYPE';
}

export default function ToolButton(props: ToolProps) {
  const { toolType, setTool } = props;
  const [selected, select] = React.useState(false);

  const displayStr = toolToString(toolType);

  const handleClick = () => {
    select(!selected);
    setTool(toolType);
  };

  return (
    <div>
      <button className="button" type="button" onMouseDown={handleClick}>
        { selected ? '[+] ' : '' }
        { displayStr }
      </button>
    </div>
  );
}
