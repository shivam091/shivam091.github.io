export default function InternalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="container">
        <div className="page-wrapper">
          <main id="main-content" className="main-content" tabIndex={-1}>
            {children}
          </main>
        </div>
      </div>
    </>
  );
};
