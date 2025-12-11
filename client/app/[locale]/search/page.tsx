'use client';

import { useState } from 'react';
import Layout from '@/app/components/Layout';
import PageTitle from '@/app/components/PageTitle';
import { useSearchParams } from 'next/navigation';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search logic will be implemented later
  };

  return (
    <Layout>
      <div className="max-w-content mx-auto pt-4">
        <PageTitle title="Search" />
        <form onSubmit={handleSearch} className="flex items-center gap-4 mt-4 mb-10">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for notes, projects, etc."
            className="
              flex-grow
              px-4 py-2
              text-body-lg
              bg-background-light
              border border-border-light
              rounded-lg
              focus:outline-none
              focus:ring-2
              focus:ring-primary
            "
          />
          <button
            type="submit"
            className="
              px-6 py-2
              text-body-lg font-medium
              bg-primary text-white
              rounded-lg
              hover:bg-primary-dark
              focus:outline-none
              focus:ring-2
              focus:ring-primary
            "
          >
            Search
          </button>
        </form>

        {/* Search results will be displayed here */}
        <div>
          {/* Example of a search result item */}
          {/* <div className="mb-8">
            <h3 className="text-h4 font-bold mb-2">
              <a href="#" className="hover:text-primary">Search Result Title</a>
            </h3>
            <p className="text-body-md text-text-secondary">
              This is a short description of the search result. It gives a brief overview of the content.
            </p>
          </div> */}
        </div>
      </div>
    </Layout>
  );
}
