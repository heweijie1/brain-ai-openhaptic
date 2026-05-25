import type {
  DeviceProfile,
  HardwareBackend,
  PhaseAmplitudeFrame,
} from "@openhapticai/haptic-core";

export interface SimulationSnapshot {
  timestampMs: number;
  frame: PhaseAmplitudeFrame;
}

export class SimulationBackend implements HardwareBackend {
  private connected = false;
  private running = false;
  private snapshots: SimulationSnapshot[] = [];

  public constructor(private readonly profile: DeviceProfile) {}

  public async connect(): Promise<void> {
    this.connected = true;
  }

  public async disconnect(): Promise<void> {
    this.running = false;
    this.connected = false;
  }

  public getDeviceProfile(): DeviceProfile {
    return this.profile;
  }

  public async sendFrame(frame: PhaseAmplitudeFrame): Promise<void> {
    if (!this.connected) {
      throw new Error("SimulationBackend is not connected.");
    }

    if (!this.running) {
      throw new Error("SimulationBackend is not running.");
    }

    this.snapshots.push({
      timestampMs: frame.timestampMs,
      frame,
    });
  }

  public async start(): Promise<void> {
    if (!this.connected) {
      throw new Error("SimulationBackend must be connected before start.");
    }

    this.running = true;
  }

  public async stop(): Promise<void> {
    this.running = false;
  }

  public async emergencyStop(): Promise<void> {
    this.running = false;
    this.snapshots = [];
  }

  public getSnapshots(): SimulationSnapshot[] {
    return [...this.snapshots];
  }
}
