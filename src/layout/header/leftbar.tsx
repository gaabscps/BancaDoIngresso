/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useState, useLayoutEffect, useEffect } from 'react';
import { Sliders } from 'react-feather';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo/logo.png';

const Leftbar = (): JSX.Element => {
  //   const [bonusui, setBonusUI] = useState(false);
  //   const [levelMenu, setLevelMenu] = useState(false);
  //   const [sidebartoggle, setSidebartoggle] = useState(true);
  //   const [megaboxtoggle1, setMegaboxtoggle1] = useState(true);
  //   const [megaboxtoggle2, setMegaboxtoggle2] = useState(true);
  //   const [megaboxtoggle3, setMegaboxtoggle3] = useState(true);
  //   const [megaboxtoggle4, setMegaboxtoggle4] = useState(true);
  //   function useWindowSize(): number[] {
  //     const [size, setSize] = useState([0, 0]);
  //     useLayoutEffect(() => {
  //       function updateSize(): void {
  //         setSize([window.innerWidth]);
  //       }
  //       window.addEventListener('resize', updateSize);
  //       updateSize();
  //       return () => window.removeEventListener('resize', updateSize);
  //     }, []);
  //     return size;
  //   }
  //   const width = useWindowSize()[0];
  //   useEffect(() => {
  //     const ignoreClick_On_Out_side_Element = document.getElementById(
  //       'out_side_click',
  //     ) as HTMLElement;
  //     const ignoreClick_On_Main_Nav_Element = document.getElementById('sidebar-menu') as HTMLElement;
  //     document.addEventListener('click', event => {
  //       const isClickOutSideElement = ignoreClick_On_Out_side_Element.contains(event.target as Node);
  //       const isClickMainNavElement = ignoreClick_On_Main_Nav_Element.contains(event.target as Node);
  //       if (window.innerWidth <= 991 && !isClickOutSideElement && !isClickMainNavElement) {
  //         // Do something click is outside specified element
  //         (document.querySelector('.page-header') as Element).className = 'page-header close_icon';
  //         (document.querySelector('.sidebar-wrapper') as Element).className =
  //           'sidebar-wrapper close_icon';
  //       }
  //     });
  //     if (width <= 767) {
  //       setMegaboxtoggle1(true);
  //       setMegaboxtoggle2(true);
  //       setMegaboxtoggle3(true);
  //       setMegaboxtoggle4(true);
  //     } else {
  //       setMegaboxtoggle1(false);
  //       setMegaboxtoggle2(false);
  //       setMegaboxtoggle3(false);
  //       setMegaboxtoggle4(false);
  //     }
  //   }, [width]);
  //   const responsive_openCloseSidebar = (toggle: React.SetStateAction<boolean>): void => {
  //     if (width <= 991) {
  //       setBonusUI(false);
  //       (document.querySelector('.page-header') as Element).className = 'page-header';
  //       (document.querySelector('.sidebar-wrapper') as Element).className = 'sidebar-wrapper ';
  //     } else if (toggle) {
  //       setSidebartoggle(!toggle);
  //       (document.querySelector('.page-header') as Element).className = 'page-header close_icon';
  //       (document.querySelector('.sidebar-wrapper') as Element).className =
  //         'sidebar-wrapper close_icon ';
  //       (document.querySelector('.mega-menu-container') as Element).classList.remove('d-block');
  //     } else {
  //       setSidebartoggle(!toggle);
  //       (document.querySelector('.page-header') as Element).className = 'page-header';
  //       (document.querySelector('.sidebar-wrapper') as Element).className = 'sidebar-wrapper ';
  //     }
  //   };
  //   return (
  //     <Fragment>
  //       <div className="header-logo-wrapper" id="out_side_click">
  //         <div className="logo-wrapper">
  //           <Link to={`${process.env.PUBLIC_URL}/dashboard/default`}>
  //             <img className="img-fluid for-light" src={logo} alt="" />
  //           </Link>
  //         </div>
  //         <div
  //           className="toggle-sidebar"
  //           onClick={() => responsive_openCloseSidebar(sidebartoggle)}
  //           style={window.innerWidth <= 991 ? { display: 'block' } : { display: 'none' }}
  //         >
  //           <Sliders className="status_toggle middle sidebar-toggle" id="sidebar-toggle" />
  //         </div>
  //       </div>
  //     </Fragment>
  //   );

return (
  <div>
    
  </div>
)
};

export default Leftbar;
