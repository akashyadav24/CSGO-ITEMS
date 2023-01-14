export default function Custom404() {
  return (
    <>
      <header className="absolute top-0 w-full h-64 background-grid background-grid--fade-out"></header>
      <div className="absolute inset-0 flex flex-col justify-center h-screen px-4 md:px-0 md:items-center md:flex-row">
        <div>
          <h1 className="text-3xl font-bold text-indigo-500 md:text-5xl">
            404
          </h1>
        </div>
        <div className="md:pl-4 md:ml-4 md:border-l border-stone-100">
          <h1 className="mb-1 text-3xl font-bold md:text-5xl text-stone-900">
            Page Not Found
          </h1>
          <p className="text-stone-500">
            Please check the URL in the address bar and try again.
          </p>
        </div>
      </div>
    </>
  );
}
