import { memo } from 'react';

type TitleHeaderProps = {
  title: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
};

const TitleHeader = ({
  title,
  buttonLabel,
  onButtonClick,
}: TitleHeaderProps) => (
  <div className="flex items-center mb-6">
    <h1 className="text-4xl font-bold">{title}</h1>
    {onButtonClick && buttonLabel && (
      <button
        className="outline-button ml-auto -mb-1"
        type="button"
        onClick={onButtonClick}
      >
        {buttonLabel}
      </button>
    )}
  </div>
);

export default memo(TitleHeader);
