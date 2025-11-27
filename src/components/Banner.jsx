const Banner = () => {
  return (
    <div className="w-full bg-white shadow-md py-12 px-6 rounded-xl border border-gray-200 mb-8">
      <div className="text-center max-w-4xl mx-auto">

        <h2 className="text-4xl font-bold text-black">
          Welcome to SiteSync
        </h2>

        <p className="text-gray-600 mt-4 text-lg leading-relaxed">
          Streamline your construction workflow — track progress, manage teams, and stay updated with real-time insights.
        </p>

        <div className="mt-6 w-32 h-1 bg-gradient-to-r from-green-500 to-teal-400 mx-auto rounded-full"></div>

      </div>
    </div>
  );
};

export default Banner;
