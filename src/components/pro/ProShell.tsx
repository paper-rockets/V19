import React from 'react';
import { ProRail } from './ProRail';
import { ProPanel, ProPanelProps } from './ProPanel';

export type ProShellProps = ProPanelProps & {
  onOpenIllumination?: () => void;
  isIlluminationOpen?: boolean;
};

export const ProShell: React.FC<ProShellProps> = (props) => {
  return (
    <>
      <ProRail
        theme={props.theme}
        onOpenIllumination={props.onOpenIllumination}
        isIlluminationOpen={props.isIlluminationOpen}
      />
      <ProPanel {...props} />
    </>
  );
};
