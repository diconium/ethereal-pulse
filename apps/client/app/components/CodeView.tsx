import { Highlight, themes } from "prism-react-renderer";
import { render } from "@react-email/render";
import parse from 'html-react-parser';

interface CodeViewProps {
  code: string;
  language: "html" | "markdown";
}

/**
 * Returns a React component displaying the code html string as HTML or Plain Text.
 *
 * @remarks
 * This method leverages;
 * - react-email render to format the html code.
 * - html-react-parser to convert the html code string to a React component
 * - prism-react to display the html code in a formated way
 *
 * @param code - html string to be rendered
 * @param language - The code should be displayed as html or markdown (plain text)
 * @returns Returns a React component that displaying the code html string as HTML or Plain Text
 *
 * @beta
 */
const CodeView = ({code, language}: CodeViewProps) => {
  const formatCode= render(
    (parse(code) as React.ReactElement),
    {
      pretty: true,
      plainText: language === "markdown"
    });

  return (
    <div className="flex">
      <Highlight
        theme={themes.vsLight}
        code={formatCode}
        language={language}
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style} className="mx-auto">
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}

export default CodeView;