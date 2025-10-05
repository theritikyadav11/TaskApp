export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 text-gray-800">
      <header className="w-full max-w-5xl flex justify-between items-center py-6">
        <h1 className="text-3xl font-bold tracking-wide text-indigo-600">
          TaskApp
        </h1>
        <nav className="space-x-6">
          <a
            href="/login"
            className="hover:underline text-indigo-600 font-semibold"
          >
            Login
          </a>
          <a
            href="/register"
            className="hover:underline text-indigo-600 font-semibold"
          >
            Register
          </a>
        </nav>
      </header>

      <main className="flex flex-col lg:flex-row items-center justify-between w-full max-w-5xl flex-grow gap-12 my-12">
        <section className="max-w-xl space-y-6">
          <h2 className="text-5xl font-extrabold leading-tight">
            Stay Productive &amp;
            <br />
            Organize Your Tasks Easily
          </h2>
          <p className="text-lg text-gray-700">
            Manage, prioritize, and track your daily tasks with ease. Experience
            smart task prioritization and a sleek dashboard.
          </p>
          <div className="space-x-4">
            <a
              href="/register"
              className="inline-block px-8 py-3 rounded bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition"
            >
              Get Started
            </a>
            <a
              href="/login"
              className="inline-block px-8 py-3 rounded border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition"
            >
              Login
            </a>
          </div>
        </section>

        <section className="max-w-md w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 480 360"
            className="w-full h-auto"
            fill="none"
          >
            <rect width="480" height="360" fill="url(#paint0_linear)" rx="20" />
            <path fill="#ffffffcc" d="M150 130h180v100H150z" rx="18" />
            <circle
              cx="240"
              cy="180"
              r="50"
              stroke="#4338ca"
              strokeWidth="10"
            />
            <line
              x1="190"
              y1="180"
              x2="290"
              y2="180"
              stroke="#4338ca"
              strokeWidth="10"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="240"
                y1="0"
                x2="240"
                y2="360"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#a5b4fc" />
                <stop offset="1" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>
        </section>
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} TaskApp. All rights reserved.
      </footer>
    </div>
  );
}
