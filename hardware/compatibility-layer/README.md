# compatibility-layer

通用硬件兼容层规划。

## 目标

让 OpenHapticAI 的统一 API 能够对接不同超声相控阵设备和实验硬件。

## 统一接口

- `connect`
- `disconnect`
- `getDeviceProfile`
- `sendFrame`
- `start`
- `stop`
- `emergencyStop`

## 公开边界

公开仓库只提供兼容层接口和通用协议，不绑定或复制任何第三方设备源码、固件或硬件文件。
