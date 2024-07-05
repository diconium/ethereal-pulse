import { Form, useLoaderData, useNavigate, useNavigation, useSubmit } from "@remix-run/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useEffect, useRef } from "react";
import { MOCKED_EMAILS } from "~/mocks/emails";
import { Email } from "~/models/email.model";
import { authMiddleware } from "~/services/auth.server";


async function getEmails(searchString: string | null): Promise<Email[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (searchString?.length) {
    return MOCKED_EMAILS.filter((item) => item.title.toLowerCase().includes(searchString.toLowerCase()));
  }
  return MOCKED_EMAILS;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authMiddleware(request);

  const url = new URL(request.url);
  const searchedStr = url.searchParams.get("email");
  const emails = await getEmails(searchedStr);
  return json({ emails, searchedStr });
};

const Emails = () => {
  const searchEmailInput = useRef<null | HTMLInputElement>(null)
  const { emails, searchedStr } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const submit = useSubmit();


  const drawEmailRows = (emails: Email[]) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };

    return emails.map((email) => (
      <tr
        key={ email.id }
        className="pb-2 border-b-2 border-gray-200 hover:bg-gray-100 cursor-pointer"
        onClick={() => navigate(`/emails/${ email.id }`)}
      >
        <td className="text-sm px-3 py-2">{ email.title }</td>
        <td className="text-sm px-3 py-1">{ email.status }</td>
        <td className="text-sm px-3 py-1">{ new Date(email.sentAt).toLocaleDateString("en-US", options) } </td>
      </tr>
    ))
  }

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "email"
    );

  useEffect(() => {
    if (searchEmailInput?.current) {
      searchEmailInput.current.value = searchedStr || "";
    }
  }, [ searchedStr ]);

  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Emails</h1>
      <Form
        id="emails-search-form"
        onChange={ (event) => {
          const isFirstSearch = searchedStr === null;
          submit(event.currentTarget, {
            replace: !isFirstSearch,
          });
        } }
        role="search"
      >
        <input
          ref={searchEmailInput}
          className="w-full px-3 py-2 bg-gray-100 focus:outline-gray-400 rounded-lg text-md mb-4 leading-7"
          aria-label="Search email"
          defaultValue={ searchedStr || "" }
          placeholder="Search email"
          type="search"
          name="email"
        />
      </Form>
      <table className="table-fixed w-full">
        <thead>
        <tr>
          <th className="text-left p-3">Name</th>
          <th className="text-left p-3 lg:w-[200px]">Status</th>
          <th className="text-left p-3 lg:w-[200px]">Sent at</th>
        </tr>
        </thead>
        <tbody>
        {
          searching ?
            (<tr>
              <td className="px-3">Loading...</td>
            </tr>) : (emails.length && !searching ?
              drawEmailRows(emails) : (<tr>
                <td className="px-3">No emails found</td>
              </tr>))
        }
        </tbody>
      </table>
    </>
  );
}

export default Emails;