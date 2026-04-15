import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
  Sequence,
  Audio,
  staticFile,
} from 'remotion';
import { AdProps } from './types';

const COLORS = {
  background: '#121212',
  primary: '#D4AF37', // Gold/Amber
  text: '#FFFFFF',
  textSecondary: '#CCCCCC',
};

export const AdTemplate: React.FC<AdProps> = ({ scenes, style, platform }) => {
  const { fps } = useVideoConfig();

  if (!scenes || scenes.length === 0) {
    return <AbsoluteFill style={{ backgroundColor: COLORS.background }} />;
  }

  let startFrame = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, color: COLORS.text, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Background Ambience / Cinematic Track */}
      <Audio src={staticFile('soundtrack.mp3')} volume={0.5} />

      {scenes.map((scene, index) => {
        const sceneDurationInFrames = Math.max(1, Math.round(scene.duration * fps));
        const currentSequenceStart = startFrame;
        startFrame += sceneDurationInFrames;

        return (
          <Sequence from={currentSequenceStart} durationInFrames={sceneDurationInFrames} key={index}>
            <SceneContent scene={scene} index={index} />
          </Sequence>
        );
      })}

      {/* Industrial Texture Overlay (Subtle) */}
      <AbsoluteFill style={{ 
        opacity: 0.05, 
        pointerEvents: 'none', 
        backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', 
        backgroundSize: '40px 40px' 
      }} />
    </AbsoluteFill>
  );
};

const SceneContent: React.FC<{ scene: any; index: number }> = ({ scene, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationInFrames = Math.round(scene.duration * fps);

  // Animations
  const opacity = interpolate(
    frame, 
    [0, 10, Math.max(11, durationInFrames - 10), durationInFrames], 
    [0, 1, 1, 0], 
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const translateY = interpolate(
    frame, 
    [0, 15], 
    [20, 0], 
    { easing: Easing.out(Easing.quad), extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const scale = interpolate(
    frame, 
    [0, durationInFrames], 
    [1, 1.05],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: '60px',
      opacity,
      transform: `translateY(${translateY}px) scale(${scale})`,
      textAlign: 'center'
    }}>
      <div style={{
        fontSize: '64px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        lineHeight: 1.2,
        color: scene.type === 'hook' || scene.type === 'opportunity' ? COLORS.primary : COLORS.text,
        textShadow: '0 4px 20px rgba(0,0,0,0.5)',
        maxWidth: '90%'
      }}>
        {scene.text}
      </div>
      
      {/* Visual Accent */}
      <div style={{
        marginTop: '30px',
        width: '80px',
        height: '4px',
        backgroundColor: COLORS.primary,
        borderRadius: '2px'
      }} />
    </AbsoluteFill>
  );
};
