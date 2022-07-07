import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { Form, Row } from 'reactstrap';
import { Icon, X } from 'react-feather';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MENUITEMS } from '../sidebar/menu';
import LeftHeader from './leftbar';
import RightHeader from './rightbar';
import { Loading } from '../../constant';
import { ApplicationState } from '../../store';

interface Menu {
  title: string;
  icon: Icon;
  type: string;
  active: boolean;
  path?: string;
  children: MenuItem[];
  badge?: string;
  badgetxt?: string;
}

interface MenuItem {
  path: string;
  title: string;
  type: string;
  active?: boolean;
}

const Header = (): JSX.Element => {
  const menus: Menu[] = [];
  MENUITEMS.Items.forEach(menu => {
    menus.push(menu as Menu);
  });
  const [mainmenu] = useState(menus);
  const [searchValue, setSearchValue] = useState('');
  const [searchValues, setSearchValues] = useState([] as Menu[]);
  // eslint-disable-next-line
  const [searchResult, setSearchResult] = useState(false);
  // eslint-disable-next-line
  const [searchResultEmpty, setSearchResultEmpty] = useState(false);
  const layout_type = useSelector<ApplicationState>(content => content.customizer.data.layout);
  const layout_version = useSelector<ApplicationState>(
    content => content.customizer.data.mix_background_layout,
  );

  const escFunction = useCallback((event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      setSearchValue('');
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  const checkSearchResultEmpty = (items: Menu[]): void => {
    if (!items.length) {
      setSearchResultEmpty(true);
      (document.querySelector('.empty-menu') as Element).classList.add('is-open');
    } else {
      setSearchResultEmpty(false);
      (document.querySelector('.empty-menu') as Element).classList.remove('is-open');
    }
  };

  const addFix = (): void => {
    setSearchResult(true);
    (document.querySelector('.Typeahead-menu') as Element).classList.add('is-open');
    document.body.className = `${layout_version} ${layout_type} offcanvas`;
  };

  const removeFix = (): void => {
    setSearchResult(false);
    setSearchValue('');
    (document.querySelector('.Typeahead-menu') as Element).classList.remove('is-open');
    document.body.className = `${layout_version} ${layout_type}`;
  };

  const handleSearchKeyword = (keyword: string): void => {
    if (keyword) {
      addFix();
    } else {
      removeFix();
    }
    const items: Menu[] = [];
    setSearchValue(keyword);
    mainmenu.filter(mItems => {
      let add = false;
      if (mItems.title.toLowerCase().includes(keyword) && mItems.type === 'link') {
        items.push(mItems);
        add = true;
      }
      if (!mItems.children) return false;
      if (!add) {
        const childres = mItems.children.filter(
          subItems => subItems.title.toLowerCase().includes(keyword) && subItems.type === 'link',
        );
        if (childres.length > 0) {
          items.push(mItems);
        }
      }
      checkSearchResultEmpty(items);
      setSearchValues(items);
      return mItems;
    });
  };

  return (
    <Fragment>
      <div className="page-header">
        <Row className="header-wrapper m-0 justify-content-end align-items-end">
          <Form className="form-inline search-full" action="#" method="get">
            <div className="form-group w-100">
              <div className="Typeahead Typeahead--twitterUsers">
                <div className="u-posRelative">
                  <input
                    className="Typeahead-input form-control-plaintext w-100"
                    id="demo-input"
                    type="search"
                    placeholder="Search Cuba .."
                    defaultValue={searchValue}
                    onChange={e => handleSearchKeyword(e.target.value)}
                  />
                  <div className="spinner-border Typeahead-spinner" role="status">
                    <span className="sr-only">{Loading}</span>
                  </div>
                  <X
                    className="close-search"
                    onClick={() =>
                      (document.querySelector('.search-full') as Element).classList.remove('open')
                    }
                  />
                </div>
                <div className="Typeahead-menu custom-scrollbar" id="search-outer">
                  {searchValue
                    ? searchValues.map((data, index) => (
                        <div className="ProfileCard u-cf" key={index}>
                          {data.icon && (
                            <div className="ProfileCard-avatar">
                              <data.icon />
                            </div>
                          )}
                          <div className="ProfileCard-details">
                            <div className="ProfileCard-realName">
                              <Link
                                to={data.path as string}
                                className="realname"
                                onClick={removeFix}
                              >
                                {data.title}
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))
                    : ''}
                </div>
                <div className="Typeahead-menu empty-menu">
                  <div className="tt-dataset tt-dataset-0">
                    <div className="EmptyMessage">{'Opps!! There are no result found.'}</div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
          <LeftHeader />
          <RightHeader />
        </Row>
      </div>
    </Fragment>
  );
};

export default Header;
