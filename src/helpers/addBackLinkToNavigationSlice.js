'use client';

import { updateNavToBackPage } from '@/store/navigationSlice';
import { useDispatch } from 'react-redux';

export const addBackLink = (link, title, nextPageTitle) => {
  const dispatch = useDispatch();
  dispatch(
    updateNavToBackPage({
      key: 'backPage',
      data: {
        link: link,
        title: title,
        currentPageTitle: nextPageTitle,
      },
    })
  );
};
