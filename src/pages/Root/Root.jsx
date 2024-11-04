import {Outlet} from "react-router-dom";
import styles from "./Root.module.scss";
import Header from "../../components/Header/index.js";

const Root = () => {
    return (
        <div className={styles.root}>
            <Header />
            <main className={styles.mainContainer}>
                <Outlet />
            </main>
        </div>
    )
};

export default Root;
