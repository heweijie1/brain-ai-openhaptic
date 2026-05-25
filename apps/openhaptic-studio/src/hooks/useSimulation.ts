import { useState, useCallback } from 'react'
import { createGridArrayGeometry } from '@openhapticai/haptic-simulation'
import { solveFrame, computePressureAtPoint } from '@openhapticai/haptic-field-solver'
import type { PhaseAmplitudeFrame } from '@openhapticai/haptic-core'

export interface SimParams {
  focusX: number
  focusY: number
  focusZ: number
  intensity: number
}

export interface SimResult {
  frame: PhaseAmplitudeFrame
  pressurePa: number
  channelCount: number
}

export const GRID_GEOMETRY = createGridArrayGeometry({
  id: 'studio-16x16',
  rows: 16,
  columns: 16,
  spacingM: 0.0105,
  carrierFrequencyHz: 40_000,
})

export function useSimulation() {
  const [result, setResult] = useState<SimResult | null>(null)
  const [running, setRunning] = useState(false)
  const [logs, setLogs] = useState<string[]>([
    'Studio 工作台已加载',
    '当前 backend：SimulationBackend (16×16, 40kHz)',
    '等待运行仿真指令…',
  ])

  const run = useCallback((params: SimParams) => {
    setRunning(true)
    const ts = new Date().toLocaleTimeString('zh-CN', { hour12: false })
    setLogs(prev => [
      ...prev,
      `[${ts}] 开始仿真: 焦点 (${params.focusX.toFixed(3)}, ${params.focusY.toFixed(3)}, ${params.focusZ.toFixed(3)}) m`,
    ])

    try {
      const focusPosition = { x: params.focusX, y: params.focusY, z: params.focusZ }

      const frame = solveFrame(
        GRID_GEOMETRY,
        {
          position: focusPosition,
          coordinateSystem: 'array_local',
          intensity: params.intensity,
        },
        Date.now(),
        {
          maxIntensity: Math.min(params.intensity * 1.05, 1.0),
          maxDurationMs: 60_000,
          maxDutyCycle: 1.0,
          maxFocusPoints: 1,
          allowedCoordinateSystems: ['array_local'],
        },
      )

      const pressurePa = computePressureAtPoint(GRID_GEOMETRY, frame.channels, focusPosition)

      const channelCount = frame.channels.filter(c => c.enabled).length

      setResult({ frame, pressurePa, channelCount })
      setLogs(prev => [
        ...prev,
        `[${ts}] ✓ 完成: ${channelCount} 通道启用, 焦点声压 ${pressurePa.toFixed(4)} Pa${frame.safetyLimited ? ' [安全限幅]' : ''}`,
      ])
    } catch (e) {
      setLogs(prev => [...prev, `[${ts}] ✗ 错误: ${String(e)}`])
    }

    setRunning(false)
  }, [])

  const reset = useCallback(() => {
    setResult(null)
    setLogs(['Studio 工作台已加载', '当前 backend：SimulationBackend (16×16, 40kHz)', '等待运行仿真指令…'])
  }, [])

  return { result, running, logs, run, reset }
}
