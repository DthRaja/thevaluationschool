import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Inbox } from "lucide-react";

import ServerApi from "@/utils/Server";
import convertData from "@/utils/convartData";

export interface IBlogCategory {
  CategoryId: number;
  Name: string;
}

export interface IBlogListItem {
  Title: string;
  Slug: string;
  Excerpt?: string;
  CoverMediaUrl?: string;
  CreatedOn?: string;
  Status?: string;
  BlogCategory?: string;
}

export interface IBlogListResponse {
  NoOfPages?: number;
  Categories?: IBlogCategory[];
  BlogList?: IBlogListItem[];
}

interface BlogListProps {
  searchParams: Promise<{ page?: string; category?: string }>;
}

const PLACEHOLDER_COVER = "/img/main-logo.jpg";

export const metadata: Metadata = {
  title: "Latest Blogs | The Valuation School",
  description:
    "Explore our latest articles, insights and updates from the CA, CFA, and valuation domain.",
};

const buildPageHref = (page: number, categoryId: number | null) => {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  if (categoryId) params.set("category", String(categoryId));
  const qs = params.toString();
  return qs ? `/blog?${qs}` : "/blog";
};

const BlogList = async ({ searchParams }: BlogListProps) => {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || "1", 10) || 1);
  const activeCategoryId = params.category ? parseInt(params.category, 10) || null : null;

  const blogApi = new ServerApi({ withAuth: false, spName: "SPClientAnonymous", mode: 60 });
  const res = await blogApi.request({ PageNo: currentPage, CategoryId: activeCategoryId || 0 });
  const data: IBlogListResponse = convertData(res?.result) || {};

  const totalPages = data.NoOfPages || 0;
  const categories = data.Categories || [];
  const blogs = data.BlogList || [];

  return (
    <section className="view-more-blog-section blog-list-page" id="blog-section">
      <div className="container">
        <div className="view-more-blog-container">
          <div className="blog-page-heading text-center">
            <h1>Latest Blogs</h1>
            <p>Explore our latest articles, insights and updates from the CA domain.</p>
          </div>

          {categories.length > 0 && (
            <div className="blog-categories" aria-label="Filter blogs by category">
              <Link
                href={buildPageHref(1, null)}
                className={`blog-category-pill${activeCategoryId === null ? " active" : ""}`}
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.CategoryId}
                  href={buildPageHref(1, cat.CategoryId)}
                  className={`blog-category-pill${activeCategoryId === cat.CategoryId ? " active" : ""}`}
                >
                  {cat.Name}
                </Link>
              ))}
            </div>
          )}

          {blogs.length === 0 ? (
            <div className="blog-empty-state">
              <Inbox size={40} strokeWidth={1.5} aria-hidden="true" />
              <p>No blogs found.</p>
            </div>
          ) : (
            <div className="view-more-blog-grid">
              {blogs.map((blog) => (
                <article className="view-more-blog-item" key={blog.Slug}>
                  <Link href={`/blog/${blog.Slug}`} className="view-more-blog-item-image">
                    <img
                      src={blog.CoverMediaUrl || PLACEHOLDER_COVER}
                      alt={blog.Title}
                      loading="lazy"
                    />
                    {blog.BlogCategory && (
                      <span className="blog-category-chip">{blog.BlogCategory}</span>
                    )}
                  </Link>
                  <div className="view-more-blog-item-content">
                    {(blog.CreatedOn || blog.Status) && (
                      <span className="blog-meta">
                        {blog.CreatedOn}
                        {blog.Status ? ` · ${blog.Status}` : ""}
                      </span>
                    )}
                    <h3>
                      <Link href={`/blog/${blog.Slug}`}>{blog.Title}</Link>
                    </h3>
                    {blog.Excerpt && <p>{blog.Excerpt}</p>}
                    <Link className="blog-read-more" href={`/blog/${blog.Slug}`}>
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav aria-label="Blog pagination" className="pagination">
              {currentPage === 1 ? (
                <span className="pagination-btn disabled" aria-hidden="true">
                  «
                </span>
              ) : (
                <Link
                  href={buildPageHref(currentPage - 1, activeCategoryId)}
                  className="pagination-btn"
                  aria-label="Previous page"
                >
                  «
                </Link>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Link
                  key={page}
                  href={buildPageHref(page, activeCategoryId)}
                  className={`pagination-number${page === currentPage ? " active" : ""}`}
                  aria-current={page === currentPage ? "page" : undefined}
                >
                  {page}
                </Link>
              ))}

              {currentPage === totalPages ? (
                <span className="pagination-btn disabled" aria-hidden="true">
                  »
                </span>
              ) : (
                <Link
                  href={buildPageHref(currentPage + 1, activeCategoryId)}
                  className="pagination-btn"
                  aria-label="Next page"
                >
                  »
                </Link>
              )}
            </nav>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
