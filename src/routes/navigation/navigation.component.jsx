import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { CartContext } from '../../contexts/cart.context';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import './navigation.styles.scss';

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
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrwnLogo className='logo' />
        </Link>
        <div className='nav-links-container'>
              {/* link is pretty much like an anchor tag */}
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>

          {currentUser ? (
            <span className='nav-link' onClick={signOutHandler}>
              {' '}
              SIGN OUT{' '}
            </span>
          ) : (
            <Link className='nav-link' to='/auth'>
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropDown />}
      </div>
       {/* If there are any child components in the route tage then they will be displayed using an outlet*/}
      <Outlet />
    </Fragment>
  );
};

export default Navigation;