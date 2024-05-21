import { EuiBasicTableColumn, EuiInMemoryTable } from '@elastic/eui';

import { FC } from 'react';
import { Post } from '../pages/Posts';
import { usePostsTable } from '../hooks/usePostsTable';

interface PostsTableProps {
  posts: Post[];
}

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

export const PostsTable: FC<PostsTableProps> = ({ posts }) => {
  const {
    pagination,
    search,
    sorting,
    getRowProps,
    getCellProps,
    onTableChange,
  } = usePostsTable();

  return (
    <EuiInMemoryTable
      items={posts}
      tableCaption="Demo of EuiBasicTable"
      columns={columns}
      sorting={sorting}
      search={search}
      rowProps={getRowProps}
      cellProps={getCellProps}
      onChange={onTableChange}
      pagination={{
        ...pagination,
        pageSizeOptions: [10, 25, 50],
      }}
    />
  );
};
