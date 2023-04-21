import { ContextClass, ToolType } from '@/Types';
import React, { useState } from 'react';
// eslint-disable-next-line import/no-cycle
import ToolButton from './BasicToolButton';
import PauseButton from './PauseButton';
import StepButton from './StepButton';

export const ToolContext = React.createContext<ToolType>('null');

interface ToolButtonHandlerProps {
  togglePause: () => void;
  step: () => void;
}

export default function ToolButtonHandler(props: ToolButtonHandlerProps) {
  const { togglePause, step } = props;
  const [toolType, setToolType] = useState<ToolType>('null');

  const changeType = (newTool: ToolType) => {
    ContextClass.setToolType(newTool);
    setToolType(ContextClass.getToolType());
  };

  return (
    <div className="tools">
      <PauseButton id="pause-button" toggle={togglePause} />
      <StepButton step={step} />
      <ToolContext.Provider value={toolType}>
        <ToolButton personalType="add" changeType={changeType} />
        <ToolButton personalType="select" changeType={changeType} />
      </ToolContext.Provider>
    </div>
  );
}
