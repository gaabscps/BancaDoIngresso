import React, { Fragment, useState, useEffect, useCallback, MouseEvent } from 'react';
import { Icon, Star } from 'react-feather';
import { Col, Button, Input, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { MENUITEMS } from '../sidebar/menu';
import { Bookmark, AddNewBookmark, Back } from '../../constant';

interface Menu {
  title: string;
  icon: Icon;
  type: string;
  active: boolean;
  path?: string;
  children: MenuItem[];
  badge?: string;
  badgetxt?: string;
  bookmark?: boolean;
}

interface MenuItem {
  icon: Icon;
  path: string;
  title: string;
  type: string;
  active?: boolean;
}

const Bookmarks = (): JSX.Element => {
  const menus: Menu[] = [];
  MENUITEMS.Items.forEach(data => {
    menus.push(data as Menu);
  });

  // eslint-disable-next-line
  const [mainmenu, setMainMenu] = useState(menus);
  const [searchValue, setSearchValue] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchResult, setSearchResult] = useState(false);
  const [searchResults, setSearchResults] = useState([] as Menu[]);
  const [bookmarkSearch, SetBookmarkSearch] = useState(false);
  const [bookmarkItems, setBookmarkItems] = useState([] as Menu[]);
  const [bookmarkDropDown, setBookmarkDropDown] = useState(false);

  const escFunction = useCallback((event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      setSearchValue('');
      setSearchResult(false);
      setSearchResults([]);
      SetBookmarkSearch(false);
      (document.querySelector('.filled-bookmark') as Element).classList.remove('is-open');
      (document.querySelector('.page-wrapper') as Element).classList.remove('offcanvas-bookmark');
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    mainmenu.filter(items => {
      if (items.bookmark) {
        setBookmarkItems([...bookmarkItems, items]);
      }
      return items;
    });
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [mainmenu, escFunction]);

  const addFix = (): void => {
    (document.querySelector('.filled-bookmark') as Element).classList.add('is-open');
  };

  const removeFix = (): void => {
    setSearchValue('');
    setSearchResult(false);
    setSearchResults([]);
    (document.querySelector('.filled-bookmark') as Element).classList.remove('is-open');
  };

  const checkSearchResultEmpty = (items: Menu[]): void => {
    if (!items.length) {
      (document.querySelector('.empty-bookmark') as Element).classList.add('is-open');
    } else {
      (document.querySelector('.empty-bookmark') as Element).classList.remove('is-open');
    }
  };

  const handleSearchKeyword = (keyword: string): void => {
    if (keyword) {
      addFix();
    } else {
      removeFix();
    }
    setSearchValue(keyword);
    const items = mainmenu.filter(Items => {
      if (Items.title.toLowerCase().includes(keyword) && Items.type === 'link') {
        items.push(Items);
      }
      if (!Items.children) return false;
      Items.children.filter(subItems => {
        if (subItems.title.toLowerCase().includes(keyword) && subItems.type === 'link') {
          // eslint-disable-next-line no-param-reassign
          subItems.icon = Items.icon;
        }
        return subItems;
      });
      checkSearchResultEmpty(items);
      setSearchResults(items);
      return Items;
    });
  };

  const addToBookmark = (event: MouseEvent<HTMLElement>, index: number, items: Menu): void => {
    if (index === -1 && !items.bookmark) {
      mainmenu[index].bookmark = true;
      event.currentTarget.classList.add('starred');
      setBookmarkItems([...bookmarkItems, items]);
    } else {
      event.currentTarget.classList.remove('starred');
      bookmarkItems.splice(index, 1);
      setBookmarkItems(bookmarkItems);
      mainmenu[index].bookmark = false;
    }
    setMainMenu(mainmenu);
  };

  const removeOffcanvas = (): void => {
    if (bookmarkSearch) {
      setSearchValue('');
      setSearchResult(false);
      setSearchResults([]);
      (document.querySelector('.filled-bookmark') as Element).classList.remove('is-open');
      (document.querySelector('.page-wrapper') as Element).classList.remove('offcanvas-bookmark');
    }
    SetBookmarkSearch(!bookmarkSearch);
  };

  const addnewbookmark = (): void => {
    (document.querySelector('.flip-card-inner') as Element).classList.add('flipped');
  };
  const backtobookmark = (): void => {
    (document.querySelector('.flip-card-inner') as Element).classList.remove('flipped');
  };

  return (
    <Fragment>
      <li className="onhover-dropdown">
        <div className="notification-box" onClick={() => setBookmarkDropDown(!bookmarkDropDown)}>
          <Star />
        </div>
        <div className={`onhover-show-div bookmark-flip ${bookmarkDropDown ? 'active' : ''}`}>
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="front">
                <ul className="droplet-dropdown bookmark-dropdown">
                  <li className="gradient-primary" onClick={removeOffcanvas}>
                    <Star />
                    <h6 className="f-18 mb-0">{Bookmark}</h6>
                  </li>
                  <li className="custom-scrollbar">
                    <Row>
                      {bookmarkItems.map((items, index) => (
                        <Col xs="4" className="text-center" key={index}>
                          <Link to={items.path as string}>
                            <items.icon id={`items${index}`} />
                          </Link>
                        </Col>
                      ))}
                    </Row>
                  </li>
                  <li className="text-center">
                    <Button className="flip-btn" onClick={addnewbookmark}>
                      {AddNewBookmark}
                    </Button>
                  </li>
                </ul>
              </div>
              <div className="back">
                <ul>
                  <li>
                    <div className="droplet-dropdown bookmark-dropdown flip-back-content">
                      <Input
                        type="text"
                        placeholder="search..."
                        value={searchValue}
                        onChange={e => handleSearchKeyword(e.target.value)}
                      />

                      <div
                        className="Typeahead-menu filled-bookmark custom-scrollbar"
                        id="search-outer"
                      >
                        {searchValue
                          ? searchResults.map((data, index) => (
                              <div className="ProfileCard u-cf" key={index}>
                                <div className="ProfileCard-avatar">
                                  <data.icon />
                                </div>
                                <div className="ProfileCard-details">
                                  <div className="ProfileCard-realName">
                                    <Link
                                      to={data.path as string}
                                      className="realname"
                                      onClick={removeFix}
                                    >
                                      {data.title}
                                    </Link>
                                    <span className="pull-right">
                                      <a href="#javascript">
                                        <i
                                          className="fa fa-star-o mt-1 icon-star"
                                          onClick={e => addToBookmark(e, index, data)}
                                        ></i>
                                      </a>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))
                          : ''}
                      </div>
                      <div className="Typeahead-menu empty-bookmark">
                        <div className="tt-dataset tt-dataset-0">
                          <div className="EmptyMessage">{'Opps!! There are no result found.'}</div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Button className="d-block flip-back" onClick={backtobookmark}>
                      {Back}
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </li>
    </Fragment>
  );
};

export default Bookmarks;
