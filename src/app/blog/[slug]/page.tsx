import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import ServerApi from "@/utils/Server";
import convertData from "@/utils/convartData";
import type { IBlogListItem, IBlogListResponse } from "../page";

const PLACEHOLDER_COVER = "/img/main-logo.jpg";
const RELATED_POSTS_LIMIT = 4;

interface BlogDetailsProps {
  params: Promise<{ slug: string }>;
}

interface IBlogCategoryRef {
  CategoryId: number;
  Name: string;
  Slug?: string;
}

interface IBlogTagRef {
  TagId: number;
  Name: string;
  Slug?: string;
}

interface IBlogSection {
  ID: number;
  SectionType: number;
  HtmlBody: string;
  SortedOrder: number;
}

interface IBlogPostDetails {
  PostId: number;
  Title: string;
  Slug: string;
  Excerpt?: string;
  CoverMediaUrl?: string;
  CreatedOn?: string;
  Status?: string;
  MetaDescription?: string;
  MetaKeyWords?: string;
  BlogSection?: IBlogSection[];
  BlogTags?: IBlogTagRef[];
  BlogCategory?: IBlogCategoryRef[];
}

async function getBlogBySlug(slug: string): Promise<IBlogPostDetails | null> {
  const api = new ServerApi({ withAuth: false, spName: "SPClientAnonymous", mode: 61 });
  const res = await api.request({ BlogSlug: slug });
  const data = convertData(res?.result);

  return data && typeof data === "object" && data.PostId ? (data as IBlogPostDetails) : null;
}

async function getRelatedPosts(blog: IBlogPostDetails): Promise<IBlogListItem[]> {
  const categoryName = blog.BlogCategory?.[0]?.Name;
  if (!categoryName) return [];

  const api = new ServerApi({ withAuth: false, spName: "SPClientAnonymous", mode: 60 });
  const res = await api.request({ PageNo: 1, CategoryId: 0 });
  const data: IBlogListResponse = convertData(res?.result) || {};

  return (data.BlogList || [])
    .filter((item) => item.Slug !== blog.Slug && item.BlogCategory === categoryName)
    .slice(0, RELATED_POSTS_LIMIT);
}

export async function generateMetadata({ params }: BlogDetailsProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return { title: "Blog not found | The Valuation School" };
  }

  const description =
    blog.MetaDescription || blog.Excerpt || `Read ${blog.Title} on The Valuation School blog.`;

  return {
    title: `${blog.Title} | The Valuation School Blog`,
    description,
    keywords: blog.MetaKeyWords || undefined,
    alternates: {
      canonical: `/blog/${blog.Slug}`,
    },
    openGraph: {
      title: blog.Title,
      description,
      type: "article",
      images: blog.CoverMediaUrl ? [{ url: blog.CoverMediaUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.Title,
      description,
    },
  };
}

const BlogDetails = async ({ params }: BlogDetailsProps) => {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(blog);
  const sections = [...(blog.BlogSection || [])].sort((a, b) => a.SortedOrder - b.SortedOrder);
  const categories = blog.BlogCategory || [];
  const tags = blog.BlogTags || [];

  return (
    <>
      {/* The CMS-authored article body below uses Font Awesome icons (e.g. the
          "Article content" reading-time badge) — loaded here rather than
          site-wide since only blog posts need it. */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        precedence="default"
      />

      <section className="blog-details-section">
        <div className="container">
          <Link href="/blog" className="blog-back-link">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to all blogs
          </Link>

          <div className="blog-details-container">
            <div className="blog-details-content">
              {(blog.CreatedOn || blog.Status) && (
                <span className="blog-details-date">
                  {blog.CreatedOn}
                  {blog.Status ? ` · ${blog.Status}` : ""}
                </span>
              )}

              <h1 className="blog-details-title">{blog.Title}</h1>

              {blog.Excerpt && <p>{blog.Excerpt}</p>}

              {(categories.length > 0 || tags.length > 0) && (
                <div className="blog-details-tags">
                  {categories.map((cat) => (
                    <span key={`cat-${cat.CategoryId}`}>{cat.Name}</span>
                  ))}
                  {tags.map((tag) => (
                    <span key={`tag-${tag.TagId}`}>{tag.Name}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="blog-details-image">
              <div className="blog-details-image-content">
                <img src={blog.CoverMediaUrl || PLACEHOLDER_COVER} alt={blog.Title} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {sections.length > 0 && (
        <section className="blog-article-body-section">
          <div className="container">
            <div className="blog-article-body">
              {sections.map((section) => (
                <div key={section.ID} dangerouslySetInnerHTML={{ __html: section.HtmlBody }} />
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedPosts.length > 0 && (
        <section className="blog-reset-section">
          <div className="container">
            <div className="blog-reset-container">
              <div className="headings">
                <h3>You might also like</h3>
              </div>

              <div className="blog-reset-items">
                {relatedPosts.map((post) => (
                  <Link
                    href={`/blog/${post.Slug}`}
                    className="blog-reset-item"
                    key={post.Slug}
                  >
                    <div className="blog-reset-item-image">
                      <img
                        src={post.CoverMediaUrl || PLACEHOLDER_COVER}
                        alt={post.Title}
                        loading="lazy"
                      />
                    </div>
                    <div className="blog-reset-item-content">
                      {post.CreatedOn && <span>{post.CreatedOn}</span>}
                      <h3>{post.Title}</h3>
                      {post.BlogCategory && (
                        <div className="blog-reset-item-tags">
                          <span>{post.BlogCategory}</span>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BlogDetails;
