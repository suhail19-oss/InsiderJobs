import { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

function Hero() {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);
  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);
  };

  return (
    <>
      <div className="container 2xl:px-20 mx-auto my-20">
        <div className="relative mx-2 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white px-6 py-16 lg:py-18 shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(59,130,246,0.12),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.10),transparent_55%)]" />

          <div className="relative text-center">
            <span className="inline-block mb-6 rounded-full bg-blue-500/10 px-5 py-1.5 text-xs font-semibold tracking-wide text-blue-200">
              Find what’s next for your career
            </span>

            <h1 className="mx-auto max-w-4xl text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Find work that actually
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                moves your life forward
              </span>
            </h1>

            <p className="mx-auto mb-14 max-w-2xl text-sm md:text-base text-slate-200">
              Discover verified opportunities, apply faster, and build a career
              you can be proud of.
            </p>

            <div className="mx-auto max-w-4xl rounded-2xl bg-white p-2 shadow-xl">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 text-slate-700">
                <div className="flex items-center gap-3 px-5 flex-1">
                  <img
                    src={assets.search_icon}
                    alt=""
                    className="h-4 opacity-60"
                  />
                  <input
                    type="text"
                    placeholder="Job title or keyword"
                    className="w-full bg-transparent text-sm outline-none"
                    ref={titleRef}
                  />
                </div>

                <div className="hidden sm:block h-6 w-px bg-slate-200" />

                <div className="flex items-center gap-3 px-5 flex-1">
                  <img
                    src={assets.search_icon}
                    alt=""
                    className="h-4 opacity-60"
                  />
                  <input
                    type="text"
                    placeholder="City or remote"
                    className="w-full bg-transparent text-sm outline-none"
                    ref={locationRef}
                  />
                </div>

                <button
                  onClick={onSearch}
                  className="rounded-xl bg-blue-600 px-10 py-3 text-white text-sm font-semibold transition hover:bg-blue-700 hover:shadow-lg active:scale-95 cursor-pointer"
                >
                  Explore Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container 2xl:px-20 mx-auto mb-28 px-4">
        <div className="text-center mb-12">
          <span className="inline-block rounded-full bg-blue-600/10 px-6 py-2 text-xs font-semibold text-blue-700">
            Trusted by leading companies
          </span>
        </div>

        <div className="flex items-center justify-center gap-6 sm:gap-10 overflow-x-auto whitespace-nowrap pt-2 pb-1">
          {[
            assets.microsoft_logo,
            assets.accenture_logo,
            assets.walmart_logo,
            assets.amazon_logo,
            assets.adobe_logo,
            assets.samsung_logo,
          ].map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center rounded-xl bg-white px-10 py-6 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <img src={logo} alt="" className="h-6 sm:h-7 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Hero;
