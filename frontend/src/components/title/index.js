import styled from 'styled-components';
import { colors, fontStyles } from '../../styles';

export const Title = styled.h1`
  font-family: ${fontStyles.title};
  color: ${colors.black};
  margin-bottom: 60px;
`

export const ResponsiveTitle = styled.h1`
  font-family: ${fontStyles.title};
  color: ${colors.black};
  margin-bottom: 60px;
  @media screen and (max-width: 768px) {
    align-self: center;
  }
`

export const CenteredSubTitle = styled.h2`
  font-family: ${fontStyles.subtitle};
  font-size: 25px;
  color: ${colors.black};
  margin-bottom: 30px;
  align-self: center;
`

export const SubTitle = styled.h2`
  color: ${colors.black};
`
