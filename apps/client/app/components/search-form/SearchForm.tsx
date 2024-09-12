import { Form } from '@remix-run/react';
import { useRef } from 'react';

type SearchFormProps = {
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchPlaceholder: string;
  searchedStr: string | null;
};

export const SearchForm = ({
  onSearchChange,
  searchPlaceholder,
  searchedStr,
}: SearchFormProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <Form className="mb-4" id="search-form" role="search">
      <input
        ref={searchInputRef}
        className="pulse-input"
        aria-label={searchPlaceholder}
        defaultValue={searchedStr || ''}
        placeholder={searchPlaceholder}
        type="search"
        name="search"
        onChange={onSearchChange}
      />
    </Form>
  );
};
