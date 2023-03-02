import { Input } from 'antd';

const { Search } = Input;

type SearchParticipantType = {
  onSearch: (id: string) => void;
};

export default function SearchParticipant({ onSearch }: SearchParticipantType) {
  return (
    <Search
      placeholder="enter URN"
      allowClear
      enterButton="Search by URN"
      size="large"
      onSearch={onSearch}
    />
  );
}
