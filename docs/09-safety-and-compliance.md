# 09. 安全与合规文档

## 1. 基本原则

OpenHapticAI 涉及 40kHz 超声相控阵、声场聚焦和人体触觉刺激，必须将安全作为核心设计要求。

## 2. 风险来源

- 高声压超声暴露
- 对眼睛、耳朵、面部的潜在刺激
- 对儿童、宠物、敏感人群的不确定影响
- 长时间固定点照射
- 高压驱动电路风险
- 换能器发热
- 电源过流/短路
- 不当调制导致不适

## 3. 实验阶段安全要求

- 不对准眼睛和耳朵
- 不让儿童和宠物参与测试
- 每次人体测试应短时、低功率、低占空比
- 先用仿真和非人体目标验证
- 不盲目升高电压
- 运行时监控温度和电流
- 设置紧急停止
- 所有 Demo 默认开启功率限制

## 4. 软件安全限制

系统必须提供 `SafetyProfile`：

```text
maxIntensity
maxDurationMs
maxDutyCycle
maxFocusCount
forbiddenZones
emergencyStopEnabled
thermalLimit
```

## 5. 硬件安全限制

- 驱动板应支持过流保护
- 电源应有限流
- 高频输出应隔离
- 外壳应防误触
- 应有物理急停开关
- 应有散热设计

## 6. 应用场景限制

V0-V2 阶段仅用于：

- 科研
- 教学
- 工程验证
- 非商业 Demo

不用于：

- 医疗治疗
- 儿童玩具
- 长时间人体刺激
- 高功率消费产品

## 7. 开源免责声明

项目早期应在 README 和文档中明确：

```text
This project is experimental and research-oriented. It is not a certified medical, consumer, or industrial safety product. Users must evaluate acoustic, electrical, and thermal risks before operating any hardware.
```

中文：

```text
本项目处于科研和工程验证阶段，不是经过认证的医疗、消费或工业安全产品。任何硬件实验前，使用者必须自行评估声学、电气、热风险，并采取必要保护措施。
```

## 8. 后续合规方向

未来如果进入产品阶段，需要评估：

- 声学暴露标准
- 电磁兼容 EMC
- 电气安全
- 消费电子认证
- 医疗相关法规
- 个人数据与手部追踪隐私
- AI 生成内容和交互安全
