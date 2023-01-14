export default function Custom404() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center h-screen px-4 md:px-0 md:items-center md:flex-row">
      <header className="absolute top-0 w-full h-64 background-grid background-grid--fade-out"></header>
      <div>
        <h1 className="text-3xl font-bold text-indigo-500 md:text-5xl">404</h1>
      </div>
      <div className="md:pl-4 md:ml-4 md:border-l border-stone-200">
        <h1 className="mb-1 text-3xl font-bold md:text-5xl text-stone-900">
          Page Not Found
        </h1>
        <p className="text-stone-500">
          Please check the URL in the address bar and try again.
        </p>
      </div>
    </div>
  );
}
