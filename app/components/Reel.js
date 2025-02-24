const Reel = ({ id }) => {
  return (
    <div className="relative bg-slate-200 rounded-lg shadow-md flex justify-center items-center">
        <iframe
          src={`https://www.instagram.com/reel/${id}/embed`}
          width="580px" height="570px"
          className="rounded-lg overflow-hidden"
        ></iframe>
    </div>
  );
};

export default Reel;
