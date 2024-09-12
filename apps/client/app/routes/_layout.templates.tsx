import { Form, useLoaderData, useNavigate, useNavigation, useSubmit } from "@remix-run/react";
import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Template } from '~/models/template.model';
import { getTemplates } from '~/services/templates/templates.service';
import { TitleHeader } from '~/components/title-header/TitleHeader';
import { SearchForm } from '~/components/search-form/SearchForm';
import DataTable from '~/components/data-table/DataTable';

export const meta: MetaFunction = () => {
  return [{ title: 'Templates · Ethereal Pulse' }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchedStr = url.searchParams.get('templates');
  const templates = await getTemplates(searchedStr);
  return json({ templates, searchedStr });
};

const Templates = () => {
  const searchTemplateInput = useRef<null | HTMLInputElement>(null);
  const { templates, searchedStr } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const submit = useSubmit();
  const [searchTerm, setSearchTerm] = useState(searchedStr || '');
  const [filteredTemplates, setFilteredTemplates] =
    useState<Template[]>(templates);

  const drawTemplateRows = (templates: Template[]): JSX.Element[] => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };

    return templates?.map((template) => (
      <tr
        key={template.id}
        className="pb-2 border-b-2 border-gray-200 hover:bg-gray-100 cursor-pointer"
        onClick={() => navigate(`/templates/${template.id}`)}
      >
        <td className="text-sm px-3 py-2">{template.name}</td>
        <td className="text-sm px-3 py-1">{template.subject}</td>
        <td className="text-sm px-3 py-1">
          {new Date(template.createdAt).toLocaleDateString('en-US', options)}{' '}
        </td>
      </tr>
    ));
  };

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('template');

  useEffect(() => {
    if (searchTemplateInput?.current) {
      searchTemplateInput.current.value = searchedStr || '';
    }
  }, [searchedStr]);

  useEffect(() => {
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm) {
      const filtered = templates.filter(
        (template) =>
          template.name
            .toLowerCase()
            .includes(trimmedSearchTerm.toLowerCase()) ||
          template.subject
            .toLowerCase()
            .includes(trimmedSearchTerm.toLowerCase()),
      );
      setFilteredTemplates(filtered);
    } else {
      setFilteredTemplates(templates);
    }
  }, [searchTerm, templates]);

  const debounce = (func: (...args: unknown[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: unknown[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const debouncedSubmit = useCallback(
    debounce((value: unknown) => {
      const formData = new FormData();
      formData.set('template', value as string);
      submit(formData, { replace: true });
    }, 300),
    [],
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSubmit(value);
  };

  return (
    <>
      <TitleHeader
        title="Templates"
        buttonLabel="Create"
        onButtonClick={() => navigate('/templates/create')}
      />

      <SearchForm
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search template"
        searchedStr={searchedStr}
      />

      <DataTable
        columns={['Name', 'Subject', 'Created']}
        data={filteredTemplates}
        isLoading={!!searching}
        noDataText="No Templates found"
        renderRow={(template) => drawTemplateRows([template as Template])[0]}
      />
    </>
  );
};

export default Templates;
