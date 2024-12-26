import NavBar from "../components/NavBar";

const layout = ({ children }) => {
  return (
    <>
      <div className="relative">
        <NavBar />
      </div>
      <main className=" bg-amber-50">
        <div className="container mx-auto py-36">{children}</div>
      </main>
    </>
  );
};

export default layout;
