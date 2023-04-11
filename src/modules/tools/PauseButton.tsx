import React from 'react';

interface PauseButtonProps {
  toggle: () => void;
  [rest: string]: any;
}

export default function PauseButton(props: PauseButtonProps) {
  const { toggle } = props;
  const [paused, setPause] = React.useState(false);

  const togglePause = () => {
    setPause(!paused);
    toggle();
  };

  return (
    <div>
      <button className="button" type="button" onClick={togglePause}>
        {!paused ? 'Pause' : 'Unpause' }
      </button>
    </div>
  );
}
