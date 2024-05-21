import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Post } from '../pages/Posts';
import {
  Criteria,
  EuiInMemoryTableProps,
  EuiSearchBarOnChangeArgs,
  EuiSearchBarProps,
  EuiTableFieldDataColumnType,
} from '@elastic/eui';

type Direction = 'asc' | 'desc';
type PostKeys = keyof Post;

interface Params {
  pageSize: string;
  pageIndex: string;
  sort: string;
  direction: string;
}

export const usePostsTable = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') as PostKeys;
  const direction = searchParams.get('direction') as Direction;
  const querySearch = searchParams.get('search');
  const pageIndex = searchParams.get('pageIndex');
  const pageSize = searchParams.get('pageSize');

  const [sortField, setSortField] = useState<PostKeys>(sort ?? 'id');
  const [sortDirection, setSortDirection] = useState<Direction>(
    direction ?? 'asc'
  );
  const [pagination, setPagination] = useState<Record<string, number>>({
    pageIndex: pageIndex ? Number(pageIndex) : 0,
    pageSize: pageSize ? Number(pageSize) : 10,
  });

  const getRowProps = ({ id }: Post) => {
    return {
      'data-test-subj': `row-${id}`,
      className: 'customRowClass',
      onClick: () => {
        navigate(`/details/${id}`);
      },
    };
  };

  const getCellProps = (
    { id }: Post,
    { field }: EuiTableFieldDataColumnType<Post>
  ) => {
    return {
      className: 'customCellClass',
      'data-test-subj': `cell-${id}-${String(field)}`,
      textOnly: true,
    };
  };

  const search: EuiSearchBarProps = {
    box: {
      incremental: true,
      schema: true,
    },
    defaultQuery: querySearch as string,
    onChange: ({ queryText }: EuiSearchBarOnChangeArgs) => {
      setSearchParams({
        ...Object.fromEntries([...searchParams]),
        search: queryText,
      });
      return true;
    },
  };

  const onTableChange = ({ page, sort }: Criteria<Post>) => {
    const params: Partial<Params> = {};

    if (page) {
      const { index: pageIndex, size: pageSize } = page;
      params.pageSize = pageSize.toString();
      params.pageIndex = pageIndex.toString();
      setPagination({ pageIndex, pageSize });
    }

    if (sort) {
      const { field: sortField, direction: sortDirection } = sort;
      params.sort = sortField;
      params.direction = sortDirection;
      setSortField(sortField);
      setSortDirection(sortDirection);
    }

    setSearchParams({
      ...Object.fromEntries([...searchParams]),
      ...params,
    });
  };

  const sorting: EuiInMemoryTableProps<Post>['sorting'] = {
    sort: {
      field: sortField,
      direction: sortDirection,
    },
  };

  return {
    sorting,
    pagination,
    search,
    getRowProps,
    getCellProps,
    onTableChange,
  };
};
