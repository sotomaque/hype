import React, { ComponentType } from 'react';
import useDeviceType, { DeviceTypeResponse } from './useDeviceType';

type AdditionalProps = {
  deviceType?: DeviceTypeResponse;
};

function withDeviceType<Props>(
  WrappedComponent: ComponentType<Props>
): ComponentType<Props & AdditionalProps> {
  const ComponentWithDevice = (props: Props) => {
    const deviceType = useDeviceType();
    return <WrappedComponent {...props} deviceType={deviceType} />;
  };
  return ComponentWithDevice;
}

export default withDeviceType;
