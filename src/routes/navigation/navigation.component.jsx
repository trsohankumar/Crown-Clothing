import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { CartContext } from '../../contexts/cart.context';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { NavigationContainer,NavLink,NavLinks,LogoContainer } from './navigation.styles';


const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen ,setCartItems} = useContext(CartContext)

  const signOutHandler = async () => {
    // after sign out set the current user to null, this would change the value in the navbar
    await signOutUser();

    setCartItems([])
  };

  return (
      // fragments are used when you want to have a top level parent component and dont what to render a html element for it
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinks>
              {/* link is pretty much like an anchor tag */}
          <NavLink to='/shop'>
            SHOP
          </NavLink>

          {currentUser ? (
            <NavLink as='span' onClick={signOutHandler}>
              {' '}
              SIGN OUT{' '}
            </NavLink>
          ) : (
            <NavLink to='/auth'>
              SIGN IN
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropDown />}
      </NavigationContainer>
       {/* If there are any child components in the route tage then they will be displayed using an outlet*/}
      <Outlet />
    </Fragment>
  );
};

export default Navigation;