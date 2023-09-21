/* eslint-disable @typescript-eslint/no-misused-promises */

import { ButtonRedMediun, Logo } from '../../components'
import { GlobalRegularPageStyles, Title } from '../../global';
import { useAuth0 } from '@auth0/auth0-react';

export const StartingPage = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <GlobalRegularPageStyles>
      <Logo />
      {/* <ButtonRedMediun ><Link to="/register">Register</Link></ButtonRedMediun> */}

      <ButtonRedMediun onClick={(): Promise<void> => loginWithRedirect()}>
        Login
      </ButtonRedMediun>
      <Title />
    </GlobalRegularPageStyles>
  )
}
