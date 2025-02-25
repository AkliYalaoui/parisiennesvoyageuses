import NavBar from "@/app/components/NavBar";

const layout = async ({ children, params }) => {
  const locale = (await params).locale;
  return (
    <>
      <div className="relative">
        <NavBar locale={locale} />
      </div>
      <main >
        <div className="container mx-auto py-36">{children}</div>
      </main>
    </>
  );
};

export default layout;
