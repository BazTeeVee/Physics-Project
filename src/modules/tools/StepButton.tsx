import React from 'react';

interface PauseButtonProps {
  step: () => void;
  [rest: string]: any;
}

export default function PauseButton(props: PauseButtonProps) {
  const { step } = props;

  return (
    <div>
      <button className="button" type="button" onClick={step}>
        Step
      </button>
    </div>
  );
}
