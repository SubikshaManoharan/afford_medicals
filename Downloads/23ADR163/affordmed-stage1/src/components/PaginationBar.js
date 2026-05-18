import React from 'react';
import { Pagination } from '@mui/material';

// Simple pagination wrapper using Material UI's Pagination component
export default function PaginationBar({ page, totalPages, onChange }) {
  return (
    <Pagination
      count={totalPages}
      page={page}
      onChange={onChange}
      color="primary"
      showFirstButton
      showLastButton
    />
  );
}
