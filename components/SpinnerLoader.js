export default function SpinnerLoader({ loading }) {
  return (
    <>
      {loading && (
        <div className="flex justify-center py-10">
          <svg className="ring" viewBox="25 25 50 50" strokeWidth="5">
            <circle cx="50" cy="50" r="20" />
          </svg>
        </div>
      )}
    </>
  );
}
