import {
  Comparators,
  Criteria,
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiTableFieldDataColumnType,
  EuiTableSortingType,
} from '@elastic/eui';

import { FC, useState } from 'react';
import { Post } from './Posts';
import { useSearchParams } from 'react-router-dom';

interface PostsTableProps {
  posts: Post[];
}

type Direction = 'asc' | 'desc';
type PostKeys = keyof Post;

export const PostsTable: FC<PostsTableProps> = ({ posts }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') as PostKeys;
  const direction = searchParams.get('direction') as Direction;

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState<PostKeys>(sort ?? 'id');
  const [sortDirection, setSortDirection] = useState<Direction>(
    direction ?? 'asc'
  );

  const columns: Array<EuiBasicTableColumn<Post>> = [
    {
      field: 'postId',
      name: 'Post id',
      mobileOptions: {
        render: (post: Post) => <>{post.postId}</>,
        truncateText: false,
        width: '100%',
      },
      sortable: true,
    },
    {
      field: 'id',
      name: 'Id',
      mobileOptions: {
        render: (post: Post) => <>{post.id}</>,
        truncateText: false,
        width: '100%',
      },
      sortable: true,
    },
    {
      field: 'name',
      name: 'Name',
      mobileOptions: {
        render: (post: Post) => <>{post.name}</>,
        truncateText: false,
        width: '100%',
      },
      sortable: true,
    },
    {
      field: 'email',
      name: 'Email',
      mobileOptions: {
        render: (post: Post) => <>{post.email}</>,
        truncateText: false,
        width: '100%',
      },
      sortable: true,
    },
    {
      field: 'body',
      name: 'Text',
      mobileOptions: {
        render: (post: Post) => <>{post.body}</>,
        truncateText: false,
        width: '100%',
      },
      sortable: true,
    },
  ];

  const getRowProps = (post: Post) => {
    const { id } = post;
    return {
      'data-test-subj': `row-${id}`,
      className: 'customRowClass',
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

  return (
    <EuiBasicTable
      tableCaption="Demo of EuiBasicTable"
      items={pageOfItems}
      rowHeader="firstName"
      columns={columns}
      rowProps={getRowProps}
      cellProps={getCellProps}
      pagination={pagination}
      onChange={onTableChange}
      sorting={sorting}
    />
  );
};
