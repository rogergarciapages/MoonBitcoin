/**
 * Moon phase calculation algorithm.
 * Returns the moon phase name and illumination percentage.
 */

export type MoonPhase = 
  | "New Moon"
  | "Waxing Crescent"
  | "First Quarter"
  | "Waxing Gibbous"
  | "Full Moon"
  | "Waning Gibbous"
  | "Last Quarter"
  | "Waning Crescent";

export function getMoonData(date: Date) {
  const lp = 2551443; 
  const now = new Date(date.getTime());
  const newMoon = new Date(1970, 0, 7, 20, 35, 0);
  const phase = ((now.getTime() - newMoon.getTime()) / 1000) % lp;
  const illumination = Math.abs(Math.sin(Math.PI * phase / lp));
  const phaseIndex = Math.floor(phase / (lp / 8));
  
  const phases: MoonPhase[] = [
    "New Moon",
    "Waxing Crescent",
    "First Quarter",
    "Waxing Gibbous",
    "Full Moon",
    "Waning Gibbous",
    "Last Quarter",
    "Waning Crescent"
  ];
  
  return {
    moonPhase: phases[phaseIndex],
    moonIllumination: illumination * 100
  };
}
