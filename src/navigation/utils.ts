const renderRoutes = (navigation: () => JSX.Element): JSX.Element => {
  if (typeof navigation().props?.children === 'object') {
    return navigation().props?.children;
  }

  return navigation();
};

export { renderRoutes };
