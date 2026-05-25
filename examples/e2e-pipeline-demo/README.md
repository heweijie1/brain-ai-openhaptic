# End-to-End Pipeline Demo

演示从 AI 触觉意图 → 触觉渲染 → 声场求解 → 仿真 backend 的完整数据流。

## 运行

```bash
npx tsx examples/e2e-pipeline-demo/main.ts
```

## 数据流

```text
AI Tool Call → HapticIntent → HapticPrimitive → HapticFrame[] → PhaseAmplitudeFrame[] → SimulationBackend
```
