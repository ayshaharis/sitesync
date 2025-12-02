import { CheckCircle, Hammer, Users, BarChart, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="w-full bg-gray-50 min-h-screen">
      
      {/* NAVBAR */}
      <nav className="w-full flex items-center justify-between shadow-sm bg-white py-3 px-6">
        <Link to="/">
          <h1 className="text-2xl font-bold text-gray-800">SiteSync</h1>
        </Link>

        <div className="flex items-center space-x-6">
          <Link to="/about" className="text-gray-700 font-medium hover:text-black">
            About
          </Link>

          <Link to="/login">
            <button className="px-4 py-2 border border-gray-800 rounded-lg hover:bg-gray-800 hover:text-white transition">
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-black transition">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6">

        {/* HERO SECTION */}
        <div className="grid md:grid-cols-2 gap-10 items-center py-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-snug">
              Managing Multiple Sites Shouldn't Be This Hard.
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Engineers and architects juggle multiple construction sites daily—
              each with unique workforces, expenses, payments, and documents.
              Most still rely on Excel sheets, WhatsApp notes, and paper diaries,
              leading to errors, scattered data, and slow decision-making.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              SiteSync Makes It Simple
            </h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>SiteSync</strong> centralizes your entire project workflow—daily updates,
              expenses, workforce logs, documents, and client access—all in one place.
              Powered by <strong>React</strong>, <strong>Supabase</strong>, and <strong>Tailwind CSS</strong>.
            </p>
          </div>
        </div>

      
        {/* FEATURES */}
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Available Features
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Hammer />, title: "Site Management", desc: "Create and manage multiple construction sites." },
              { icon: <Users />, title: "Workforce Tracking", desc: "Log workforce, labour cost, and daily wages." },
              { icon: <BarChart />, title: "Expenses & Payments", desc: "Track cash flow, expenses, and received payments." },
              { icon: <CheckCircle />, title: "Daily Updates", desc: "Add progress, materials used, notes, and images." },
              { icon: <Clock />, title: "Real-time Sync", desc: "Supabase + React Query for instant live updates." },
              { icon: <CheckCircle />, title: "Client Dashboard", desc: "Clients can view site progress securely." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <div className="text-green-600 mb-3">{item.icon}</div>
                <h4 className="font-semibold text-lg text-gray-900">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ROADMAP */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Upcoming Features
          </h3>

          <div className="border-l-4 border-green-600 ml-4 space-y-6">
            {[
              "Client approval workflow",
              "Auto-generated project reports",
              "Invoice management",
              "Material inventory & stock tracking",
              "AI-based cost prediction",
              "Offline mode for field engineers",
              "Push notifications for deadlines",
            ].map((item, i) => (
              <div key={i} className="ml-6">
                <h4 className="font-medium text-gray-800 flex items-start">
                  <span className="mt-1 mr-3 text-green-600">•</span>
                  {item}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="mt-16 text-center mb-20">
          <Link to="/signup">
            <button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow">
              Start Using SiteSync Today
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default About;
