export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-8 py-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-indigo-600">TaskApp</h1>
        <nav className="space-x-6">
          <a
            href="/login"
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Login
          </a>
          <a
            href="/register"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Register
          </a>
        </nav>
      </header>

      {/* Main Section */}
      <main className="flex flex-col items-center justify-center flex-grow px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          Stay Organized and Boost Productivity
        </h2>
        <p className="text-lg text-gray-600 max-w-xl mb-8">
          Manage, prioritize, and track your daily tasks effortlessly. Simplify
          your workflow with TaskApp.
        </p>
        <div className="space-x-4">
          <a
            href="/register"
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="px-8 py-3 border border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition"
          >
            Login
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 border-t border-gray-100 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} TaskApp. All rights reserved.
      </footer>
    </div>
  );
}
