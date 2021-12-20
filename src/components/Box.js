import styled from 'styled-components';
import {
  background,
  border,
  color,
  flexbox,
  layout,
  position,
  shadow,
  space,
  textAlign,
  lineHeight,
  fontWeight,
  fontSize,
} from 'styled-system';

const Box = styled.div`
  ${background}
  ${border}
  ${color}
  ${flexbox}
  ${layout}
  ${position}
  ${shadow}
  ${space}
  ${textAlign}
  ${lineHeight}
  ${fontWeight}
  ${fontSize}
`;

Box.displayName = 'Box';

export default Box;
