import style from "./Navbar.module.css";
import Menu from "../../assets/Menu.ico";
import { useState } from "react";

function Navbar(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
       <div className={style.header}>
            <header className={style.container}>
                <div className={style.textonav}>
                    <h2>Apple Premium</h2>
                </div>
                
                <nav className={style.nav}>
                    {/* Menu para desktop */}
                    <ul className={`${style.navList} ${isMenuOpen ? style.navListActive : ''}`}>
                        
                        <li>
                            <a href="/" className={style.active} onClick={closeMenu}>Início</a>
                        </li>
                        <li>
                            <a href="/" className={style.active} onClick={closeMenu}>Produtos</a>
                        </li>
                        <li>
                            <a href="/" className={style.active} onClick={closeMenu}>Contato</a>
                        </li>
                    </ul>

                    {/* Ícone do menu hamburger */}
                    <div className={style.iconmenu} onClick={toggleMenu}>
                       <img src={Menu} alt="icon-menuLateral" />
                    </div>
                </nav>

                {/* Overlay quando menu está aberto */}
                <div 
                    className={`${style.overlay} ${isMenuOpen ? style.overlayActive : ''}`}
                    onClick={closeMenu}
                ></div>
            </header>
       </div>
    );
}

export default Navbar;