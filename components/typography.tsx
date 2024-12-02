import styled from "styled-components/native";

import { Color, TextColorKey } from "./theme";
import { FC } from "react";
import { View } from "react-native";

const BaseText = styled.Text<{ color?: TextColorKey }>`
  color: ${(props) =>
    props?.theme?.color[(props?.color || "grey80") as keyof Color]};
  text-align: left;
`;

export const H1 = styled(BaseText)`
  font-size: 24px;
  line-height: 35px;
  font-family: ${({ theme }) => theme.fontFamily.bold};
`;

export const H2 = styled(BaseText)`
  font-size: 18px;
  line-height: 26px;
  font-family: ${({ theme }) => theme.fontFamily.bold};
`;
export const H2Bold = styled(H2)`
  font-family: ${({ theme }) => theme.fontFamily.bold};
`;

// P1
export const P1Regular = styled(BaseText)`
  font-size: 16px;
  line-height: 22px;
  font-family: ${({ theme }) => theme.fontFamily.regular};
`;
export const P1Bold = styled(P1Regular)`
  font-family: ${({ theme }) => theme.fontFamily.bold};
`;
export const P1Underline = styled(P1Regular)`
  text-decoration: underline;
`;

// P2
export const P2Regular = styled(BaseText)`
  font-size: 14px;
  line-height: 20px;
  font-family: ${({ theme }) => theme.fontFamily.regular};
`;
export const P2Bold = styled(P2Regular)`
  font-family: ${({ theme }) => theme.fontFamily.bold};
`;
export const P2UpperCase = styled(P2Regular)`
  text-transform: uppercase;
`;

// P3
export const P3Regular = styled(BaseText)`
  font-size: 12px;
  line-height: 16px;
  font-family: ${({ theme }) => theme.fontFamily.regular};
`;
export const P3Bold = styled(P3Regular)`
  font-family: ${({ theme }) => theme.fontFamily.bold};
`;

/** Standalone divider component
 * @param testID - testID for test purposes
 * @param height - height of the divider, default 1px
 * @param color - color of the divider
 */

interface Props {
  testID?: string;
  height?: number;
  color?: string;
}

export const Divider: FC<Props> = ({ testID, height, color }) => {
  const testId = `${testID}-ListItemSeparator`;

  return (
    <DividerContainer
      testID={`${testId}-main-container`}
      height={height}
      color={color}
    />
  );
};

const DividerContainer = styled(View)<Props>`
  background-color: ${(props) =>
    props.color ? props.color : props.theme.color.grey20};
  height: ${(props) => (props.height ? props.height : 1)}px;
  width: 100%;
`;
