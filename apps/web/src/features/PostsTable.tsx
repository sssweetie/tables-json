import {
  Criteria,
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiTableFieldDataColumnType,
} from '@elastic/eui';

import { FC, useState } from 'react';
import { Post } from './Posts';

interface PostsTableProps {
  posts: Post[];
}

export const PostsTable: FC<PostsTableProps> = ({ posts }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showPerPageOptions, setShowPerPageOptions] = useState(true);

  const columns: Array<EuiBasicTableColumn<Post>> = [
    {
      field: 'postId',
      name: 'Post id',
      mobileOptions: {
        render: (post: Post) => <>{post.postId}</>,
        truncateText: false,
        width: '100%',
      },
    },
    {
      field: 'id',
      name: 'Id',
      mobileOptions: {
        render: (post: Post) => <>{post.id}</>,
        truncateText: false,
        width: '100%',
      },
    },
    {
      field: 'name',
      name: 'Name',
      mobileOptions: {
        render: (post: Post) => <>{post.name}</>,
        truncateText: false,
        width: '100%',
      },
    },
    {
      field: 'email',
      name: 'Email',
      mobileOptions: {
        render: (post: Post) => <>{post.email}</>,
        truncateText: false,
        width: '100%',
      },
    },
    {
      field: 'body',
      name: 'Text',
      mobileOptions: {
        render: (post: Post) => <>{post.body}</>,
        truncateText: false,
        width: '100%',
      },
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

  const onTableChange = ({ page }: Criteria<Post>) => {
    if (page) {
      const { index: pageIndex, size: pageSize } = page;
      setPageIndex(pageIndex);
      setPageSize(pageSize);
    }
  };

  const findUsers = (posts: Post[], pageIndex: number, pageSize: number) => {
    let pageOfItems;

    if (!pageIndex && !pageSize) {
      pageOfItems = posts;
    } else {
      const startIndex = pageIndex * pageSize;
      pageOfItems = posts.slice(
        startIndex,
        Math.min(startIndex + pageSize, posts.length)
      );
    }

    return {
      pageOfItems,
      totalItemCount: posts.length,
    };
  };

  const { pageOfItems, totalItemCount } = findUsers(posts, pageIndex, pageSize);

  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount,
    pageSizeOptions: [10, 0],
    showPerPageOptions,
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
    />
  );
};
