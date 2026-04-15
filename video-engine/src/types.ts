export interface SceneProps {
  type: string;
  text: string;
  duration: number;
}

export interface AdProps {
  style: string;
  duration: number;
  platform: string;
  scenes: SceneProps[];
}
