import React from 'react';
import { Composition, getInputProps } from 'remotion';
import { AdTemplate } from './AdTemplate';
import { AdProps } from './types';

// Default props for previewing
const defaultProps: AdProps = {
  style: "authority_break",
  duration: 14,
  platform: "instagram_reels",
  scenes: [
    {
      type: "hook",
      text: "Você ainda acha que precisa de 500k no banco pra lucrar com obras?",
      duration: 2
    },
    {
      type: "belief_break",
      text: "Mentiram pra você. O segredo do lucro real está no dinheiro do banco, não no seu.",
      duration: 3
    },
    {
      type: "opportunity",
      text: "Na minha Consultoria Estratégica, eu te ensino a escalar construções usando capital da Caixa.",
      duration: 4
    },
    {
      type: "benefit",
      text: "Lucro máximo com risco mínimo para seu patrimônio.",
      duration: 3
    },
    {
      type: "cta",
      text: "Pare de queimar seu próprio dinheiro. Clique e agende seu diagnóstico agora.",
      duration: 2
    }
  ]
};

export const RemotionRoot: React.FC = () => {
  const inputProps = getInputProps() as AdProps;
  
  // Use inputProps if provided, otherwise fallback to defaultProps
  const props = Object.keys(inputProps).length > 0 ? inputProps : defaultProps;
  
  // High quality calculation of total duration
  const totalDuration = props.scenes.reduce((acc, scene) => acc + scene.duration, 0);

  return (
    <>
      <Composition
        id="AdVideo"
        component={AdTemplate}
        durationInFrames={Math.round(totalDuration * 30)} // 30 FPS
        fps={30}
        width={1080}
        height={1920}
        schema={null} // We handle validation in types
        defaultProps={props}
      />
    </>
  );
};
