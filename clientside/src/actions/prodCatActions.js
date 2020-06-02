import {
  PROD_CATEGORY_LOADING,
  SUBMIT_PROD_CATEGORY,
  FETCH_PROD_CATEGORY,
  PROD_CATEGORY_UPDATED,
  PROD_CATEGORY_DELETED,
} from './types';

// Parameters: category, accessToken, refreshToken
export const submitCategory = (cat, accToken, refToken) => async (dispatch) => {
  dispatch({ type: PROD_CATEGORY_LOADING });
  const res = await fetch('/api/v1/admin/category/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accToken}`,
    },
    body: JSON.stringify(cat),
  });
  const data = await res.json();
  console.log(data);
  if (!data.success) {
    // accessToken Renewal...
  } else {
    dispatch({ type: SUBMIT_PROD_CATEGORY, payload: data.category });
  }
};

export const fetchCategory = (accToken, refToken) => async (dispatch) => {
  dispatch({ type: PROD_CATEGORY_LOADING });
  const res = await fetch('/api/v1/admin/category', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accToken}`,
    },
  });
  const data = await res.json();
  if (!data.success) {
    // accessToken Renewal...
  } else {
    dispatch({ type: FETCH_PROD_CATEGORY, payload: data.categories });
  }
};

export const updateCategory = (body, accToken, refToken) => async (
  dispatch
) => {
  dispatch({ type: PROD_CATEGORY_LOADING });
  const res = await fetch(`/api/v1/admin/category/${body._id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accToken}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!data.success) {
  } else {
    dispatch({ type: PROD_CATEGORY_UPDATED, payload: body });
  }
};

export const deleteCategory = (body, accToken, refToken) => async (
  dispatch
) => {
  dispatch({ type: PROD_CATEGORY_LOADING });
  const res = await fetch(`/api/v1/admin/category/${body._id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accToken}`,
    },
  });
  const data = await res.json();
  if (!data.success) {
  } else {
    dispatch({ type: PROD_CATEGORY_DELETED, payload: body });
  }
};
