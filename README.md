# OpenHapticAI

> BRAIN AI（Brain-wide Recursive Artificial Intelligent Network）旗下的 AI-native 空中触觉交互底座。

OpenHapticAI 是由 **深圳兆小白人工智能** 发起的原创开源框架项目，目标是构建面向 AI 时代的空间触觉操作系统雏形：让 AI Agent、AR/空间计算、超声相控阵和触觉渲染逻辑结合起来，使数字对象、虚拟人物和智能场景具备可感知的空中触觉反馈。

## 项目愿景

今天的 AI 已经能看、能听、能说、能推理，但它仍然缺少一个关键能力：**触摸真实世界，也让人类触摸数字世界**。

OpenHapticAI 希望补上 AI 时代的人机交互触觉输出层：

```text
AI Agent / 多模态模型 / 世界模型
        ↓
空间理解与触觉意图生成
        ↓
触觉语义与触觉渲染 SDK
        ↓
声场求解与调制控制
        ↓
通用超声相控阵 / 自研硬件 / 兼容硬件
        ↓
人的皮肤感受到空中触觉
```

## 与 BRAIN AI 的关系

BRAIN AI 是 Brain-wide Recursive Artificial Intelligent Network 的缩写，代表面向未来的全脑递归人工智能网络思路。OpenHapticAI 是 BRAIN AI 中的 **空间触觉交互层**，负责把 AI 的认知、场景、人物和动作转化为可触摸的空间反馈。

## 技术定位

OpenHapticAI 不是简单的超声悬浮项目，而是一个面向 AI/AR/空间计算的触觉交互底座。

核心能力包括：

- AI 触觉意图建模
- 空间触觉基础元件设计
- 触觉渲染 SDK
- 声场求解与调制控制
- 多硬件后端适配
- OpenXR / Unity / AR 手部追踪接入
- 国产 AI 框架与大模型生态兼容
- 超声安全与实验规范

## 开源边界

OpenHapticAI 的公开仓库定位为原创框架和学习型开源底座：

- 不包含第三方项目源码拷贝。
- 不公开核心实验数据、材质数据集、商业校准数据和未发布硬件细节。
- 对外提供统一的触觉意图、触觉渲染、声场求解、仿真和硬件抽象。
- 对多种超声相控阵硬件、空间计算平台和国产 AI 框架保持兼容。
- 如未来引入第三方代码、PCB、固件或模型文件，必须按对应许可证保留 NOTICE、版权声明和许可证文本。

## 短期目标

短期目标是先完成 `OpenHapticAI Studio` 桌面端工作台，再逐步推进第一个可演示硬件产品原型：

- 建立本地仿真、参数调试、AI 触觉意图验证和安全检查工作台。
- 实现空中单点触觉和虚拟按钮触觉。
- 支持 3-4 种基础材质触觉表达：衣服、皮肤、头发、石头。
- 建立低成本 DIY 触觉数据采集硬件，用于采集力度、接触时间、滑动速度、振动和材质标签。
- 建立触觉数据从采集、标注、存储到 AI 训练/检索的内部闭环。
- 开源框架和示例，不公开核心实验数据和商业参数。

## 长期目标

长期目标是在 BRAIN AI 总纲下构建空间触觉操作系统：

- AI Agent 可根据场景自动生成触觉意图。
- AR/空间计算系统可把虚拟对象映射为空中触觉。
- 自研超声相控阵硬件可稳定输出多材质、多点、多轨迹触觉。
- 形成私有触觉数据资产、材质参数库和安全校准体系。
- 支持国产 AI 框架、国产算力和中国“人工智能+ / 具身智能 / 智能终端”方向。

## Monorepo 结构

```text
brain-ai-openhaptic/
  README.md
  docs/
    00-vision.md
    01-requirements.md
    02-technical-architecture.md
    03-module-interface-design.md
    04-module-plan.md
    05-task-breakdown.md
    06-progress-tracking.md
    07-related-projects.md
    08-china-ai-alignment.md
    09-safety-and-compliance.md
    10-github-launch-plan.md
    11-api-draft.md
    12-requirements-traceability.md
    13-open-source-and-ip-strategy.md
    14-product-roadmap.md
    15-tactile-data-collection.md
    16-master-design.md
    17-visualizer-ui-design-plan.md
    18-openhaptic-studio-design.md
  apps/
    openhaptic-studio/
  packages/
    haptic-core/
    haptic-field-solver/
    haptic-renderer/
    haptic-agent/
    haptic-openxr/
    haptic-simulation/
  hardware/
    generic-array-v1/
    compatibility-layer/
    haptic-data-collector-v1/
    diy-array-v1/
  examples/
    virtual-button/
    air-touch-point/
    soft-skin-contact/
    ar-hand-tracking-demo/
```

## OpenHapticAI Studio 工作台预览

> 当前版本为静态骨架，Tauri v2 原生桌面窗口，接入仿真引擎进行中。

![OpenHapticAI Studio 工作台](docs/assets/studio-preview.png)

## 当前阶段

当前项目处于 **V1.5：OpenHapticAI Studio 桌面端工作台骨架已完成**。

已完成：

1. ✅ 创建 `apps/openhaptic-studio` — Tauri v2 + React + TypeScript + Vite 骨架。
2. ✅ 实现左资源栏、中央声场画布、右参数面板和底部日志的工作台布局。
3. ✅ 原生桌面窗口可运行（`npx tauri dev`）。

下一步：

4. 接入现有 `haptic-field-solver` 和 `haptic-simulation`。
5. 在 Studio 内验证 AI 触觉意图到仿真帧的数据流。
6. Web 页面降级为官网、文档入口和轻量展示页。

## 许可证建议

早期建议：

- 框架代码：AGPL-3.0 或 GPL-3.0，用于要求二次开发公开源码。
- 硬件设计：CERN-OHL-S，用于要求硬件衍生设计开源。
- 文档：CC-BY-SA-4.0。
- 核心实验数据、材质参数库、商业校准数据：不放入公开仓库。

正式开源前需要逐一确认第三方项目许可证，并保留原作者 attribution。

## 作者

- **吴龙** — 深圳兆小白人工智能
- GitHub: [heweijie1](https://github.com/heweijie1)
