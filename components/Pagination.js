import Link from "next/link";

// Previous / Next with page numbers. `hrefFor(page)` builds the link for a page.
export default function Pagination({ page, pages, hrefFor }) {
  if (pages <= 1) return null;

  // Shows the first and last page, and two pages on each side of the current one.
  const numbers = [];
  for (let n = 1; n <= pages; n++) {
    if (n === 1 || n === pages || Math.abs(n - page) <= 2) numbers.push(n);
    else if (numbers[numbers.length - 1] !== "gap") numbers.push("gap");
  }

  return (
    <nav className="pager" aria-label="Pages">
      {page > 1 ? (
        <Link className="pager-btn" href={hrefFor(page - 1)} scroll={false}>
          Previous
        </Link>
      ) : (
        <span className="pager-btn pager-off">Previous</span>
      )}

      <ul>
        {numbers.map((n, i) =>
          n === "gap" ? (
            <li key={`gap-${i}`} className="pager-gap" aria-hidden="true">
              ...
            </li>
          ) : (
            <li key={n}>
              <Link
                className="pager-num"
                href={hrefFor(n)}
                scroll={false}
                aria-current={n === page ? "page" : undefined}
              >
                {n}
              </Link>
            </li>
          )
        )}
      </ul>

      {page < pages ? (
        <Link className="pager-btn" href={hrefFor(page + 1)} scroll={false}>
          Next
        </Link>
      ) : (
        <span className="pager-btn pager-off">Next</span>
      )}
    </nav>
  );
}
