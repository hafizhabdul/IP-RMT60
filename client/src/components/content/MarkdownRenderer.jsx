import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';

// Custom components for markdown rendering
const MarkdownComponents = {
    h1: ({ children }) => (
        <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
        <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3 pb-2 border-b border-gray-200">{children}</h2>
    ),
    h3: ({ children }) => (
        <h3 className="text-xl font-semibold text-gray-800 mt-5 mb-2">{children}</h3>
    ),
    h4: ({ children }) => (
        <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">{children}</h4>
    ),
    p: ({ children }) => (
        <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
    ),
    ul: ({ children }) => (
        <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700">{children}</ul>
    ),
    ol: ({ children }) => (
        <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-700">{children}</ol>
    ),
    li: ({ children }) => (
        <li className="text-gray-700 ml-4">{children}</li>
    ),
    blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-orange-500 pl-4 py-2 my-4 bg-orange-50 italic text-gray-800">
            {children}
        </blockquote>
    ),
    code: ({ inline, children }) => {
        if (inline) {
            return (
                <code className="px-1.5 py-0.5 bg-gray-100 text-orange-600 rounded text-sm font-mono">
                    {children}
                </code>
            );
        }
        return (
            <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-4">
                <code className="text-sm font-mono">{children}</code>
            </pre>
        );
    },
    pre: ({ children }) => (
        <div className="my-4">{children}</div>
    ),
    a: ({ href, children }) => {
        // Check if internal link
        if (href?.startsWith('/')) {
            return (
                <Link to={href} className="text-orange-600 hover:text-orange-700 underline">
                    {children}
                </Link>
            );
        }
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 underline">
                {children}
            </a>
        );
    },
    table: ({ children }) => (
        <div className="overflow-x-auto my-4">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                {children}
            </table>
        </div>
    ),
    thead: ({ children }) => (
        <thead className="bg-gray-50">{children}</thead>
    ),
    th: ({ children }) => (
        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            {children}
        </th>
    ),
    td: ({ children }) => (
        <td className="px-4 py-3 text-sm text-gray-700 border-t border-gray-200">
            {children}
        </td>
    ),
    strong: ({ children }) => (
        <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    hr: () => (
        <hr className="my-8 border-t border-gray-200" />
    ),
};

export default function MarkdownRenderer({ content }) {
    return (
        <div className="prose prose-lg max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={MarkdownComponents}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
