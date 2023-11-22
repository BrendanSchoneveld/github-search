import React from 'react';
import styled, { keyframes } from 'styled-components';

const svgAnimation = keyframes`
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
`;

const circleAnimation = keyframes`
  0%,
  25% {
    stroke-dashoffset: 280;
    transform: rotate(0deg);
  }
  50%,
  75% {
    stroke-dashoffset: 75;
    transform: rotate(45deg);
  }
  100% {
    stroke-dashoffset: 280;
    transform: rotate(360deg);
  }
`;

const Svg = styled.svg`
	animation: 2s linear infinite ${svgAnimation};
	position: relative;
	display: block;

	circle {
		animation: 1.4s ease-in-out infinite both ${circleAnimation};
		display: block;
		fill: transparent;
		stroke: #003082;
		stroke-linecap: round;
		stroke-dasharray: 283;
		stroke-dashoffset: 280;
		stroke-width: 10px;
		transform-origin: center;
	}
`;

interface IProps {
    size?: number
    color?: string;
}

const LoadingSpinner = (({ size = 40, color = '#003082', ...props }: IProps) => (
    <Svg
        viewBox={`0 0 100 100`}
        style={{
            width: size,
            height: size,
        }}
        {...props}>
        <circle
            cx={50}
            cy={50}
            r={45}
            style={{
                stroke: color,
            }}
        />
    </Svg>
));

export default LoadingSpinner;
