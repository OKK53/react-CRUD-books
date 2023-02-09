import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function Page404() {
  return (
    <div className="mt-32">
      <Helmet>
        <title>Page not found - OKK Book Shop</title>
      </Helmet>
      <h1 className="text-4xl font-semibold mb-8">Page not found</h1>
      <Link
        to="/"
        className="mb-6 p-2 cursor-pointer antialiased transition-all text-blue-400 hover:text-blue-800"
      >
        See all books
      </Link>
    </div>
  );
}

export default Page404;
