import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Post } from '../features/Posts';
import {
  Comparators,
  Criteria,
  EuiTableFieldDataColumnType,
  EuiTableSortingType,
} from '@elastic/eui';

type Direction = 'asc' | 'desc';
type PostKeys = keyof Post;

export const usePostsTable = (posts: Post[]) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') as PostKeys;
  const direction = searchParams.get('direction') as Direction;

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState<PostKeys>(sort ?? 'id');
  const [sortDirection, setSortDirection] = useState<Direction>(
    direction ?? 'asc'
  );

  const getRowProps = (post: Post) => {
    const { id } = post;
    return {
      'data-test-subj': `row-${id}`,
      className: 'customRowClass',
      onClick: () => {
        navigate(`/details/${id}`);
      },
    };
  };

  const getCellProps = (
    post: Post,
    column: EuiTableFieldDataColumnType<Post>
  ) => {
    const { id } = post;
    const { field } = column;
    return {
      className: 'customCellClass',
      'data-test-subj': `cell-${id}-${String(field)}`,
      textOnly: true,
    };
  };

  const onTableChange = ({ page, sort }: Criteria<Post>) => {
    if (page) {
      const { index: pageIndex, size: pageSize } = page;
      setPageIndex(pageIndex);
      setPageSize(pageSize);
    }
    if (sort) {
      const { field: sortField, direction: sortDirection } = sort;
      setSortField(sortField);
      setSortDirection(sortDirection);
      setSearchParams({
        ...Object.fromEntries([...searchParams]),
        sort: sortField,
        direction: sortDirection,
      });
    }
  };

  const findUsers = (
    posts: Post[],
    pageIndex: number,
    pageSize: number,
    sortField: PostKeys,
    sortDirection: 'asc' | 'desc'
  ) => {
    let items;

    if (sortField) {
      items = posts
        .slice(0)
        .sort(
          Comparators.property(sortField, Comparators.default(sortDirection))
        );
    } else {
      items = posts;
    }

    let pageOfItems;

    if (!pageIndex && !pageSize) {
      pageOfItems = items;
    } else {
      const startIndex = pageIndex * pageSize;
      pageOfItems = items.slice(
        startIndex,
        Math.min(startIndex + pageSize, posts.length)
      );
    }

    return {
      pageOfItems,
      totalItemCount: posts.length,
    };
  };

  const { pageOfItems, totalItemCount } = findUsers(
    posts,
    pageIndex,
    pageSize,
    sortField,
    sortDirection
  );

  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount,
    pageSizeOptions: [10, 0],
  };

  const sorting: EuiTableSortingType<Post> = {
    sort: {
      field: sortField,
      direction: sortDirection,
    },
  };

  return {
    sorting,
    pagination,
    pageOfItems,
    getRowProps,
    getCellProps,
    onTableChange,
  };
};
