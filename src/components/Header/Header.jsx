import {NavLink} from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from './Header.module.scss';

const navItems = [
    {label: 'Home', path: '/'},
    {label: 'Employees list', path: '/employees-list'},
];

const Header = () => (
    <header className={styles.header}>
        <div className={styles.logo}>
            <img src={logo} alt="Logo"/>
            <span>HRNet</span>
        </div>
        <nav className={styles.navbar}>
            <ul>
                {navItems.map((item, index) => (
                    <li key={index}>
                        <NavLink
                            className={({isActive}) => isActive ? styles.active : undefined}
                            to={item.path}>
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    </header>
);

export default Header;
