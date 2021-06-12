import styled from 'styled-components'
import { colors } from '../../styles'

export const Title = styled.h1`
  color: ${colors.black};
  margin-bottom: 60px;
`

export const ResponsiveTitle = styled.h1`
  color: ${colors.black};
  margin-bottom: 60px;
  @media screen and (max-width: 768px) {
    align-self: center;
  }
`

export const CenteredSubTitle = styled.h1`
  color: ${colors.black};
  margin-bottom: 30px;
  align-self: center;
`

export const SubTitle = styled.h2`
  color: ${colors.black};
`
