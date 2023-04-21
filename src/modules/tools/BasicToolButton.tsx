/* eslint-disable import/no-cycle */
import { ToolType } from '@/Types';
import React, { useContext } from 'react';
import { ToolContext } from './ToolButtonHandler';

interface ToolProps {
  personalType: ToolType;
  changeType: (newTool: ToolType) => void;
  [rest: string]: any;
}

function toolToString(toolType: ToolType): string {
  if (toolType === 'add') return 'Add';
  if (toolType === 'select') return 'Select';

  return '[ERROR] NO TOOL TYPE';
}

export default function ToolButton(props: ToolProps) {
  const { personalType, changeType, ...rest } = props;
  const displayStr = toolToString(personalType);

  const toolType = useContext(ToolContext);

  const handleClick = () => {
    changeType(personalType);
  };

  return (
    <div>
      <button className="button" type="button" onMouseDown={handleClick} {...rest}>
        { toolType === personalType ? '[+] ' : '' }
        { displayStr }
      </button>
    </div>
  );
}
