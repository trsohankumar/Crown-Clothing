import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import './navigation.styles.scss'
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'

const Navigation = () => {
    return (
        // fragments are used when you want to have a top level parent component and dont what to render a html element for it
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to='/'>
                <CrwnLogo />
            </Link>
            <div className="nav-links-container">
                {/* link is pretty much like an anchor tag */}
                <Link className="nav-link" to="/shop">
                    SHOP
                </Link>
                <Link className="nav-link" to="/auth">
                    SIGN IN
                </Link>
            </div>
        </div>
          {/* If there are any child components in the route tage then they will be displayed using an outlet*/}
        <Outlet />
      </Fragment>
    )
}

export default Navigation;