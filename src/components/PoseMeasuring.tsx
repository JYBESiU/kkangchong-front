import { Button } from './shared';

export interface PoseMeasuringProps {
  onComplete: VoidFunction;
}

function PoseMeasuring({ onComplete }: PoseMeasuringProps) {
  return (
    <div>
      <Button height={40} label="next" onClick={onComplete} />
    </div>
  );
}

export default PoseMeasuring;
