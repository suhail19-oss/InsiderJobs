import { assets } from "../assets/assets";

function Hero() {
  return (
    <>
      <div className="container 2xl:px-20 mx-auto my-20">
        <div className="relative mx-2 overflow-hidden rounded-[2.75rem] bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900 text-white px-6 py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,0.14),transparent_45%)]" />

          <div className="relative text-center">
            <span className="inline-block mb-5 rounded-full bg-white/10 px-5 py-1.5 text-xs tracking-wide text-indigo-200">
              Find what’s next for your career
            </span>

            <h1 className="mx-auto max-w-4xl text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
              Find work that actually
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-pink-300">
                moves your life forward
              </span>
            </h1>

            <p className="mx-auto mb-14 max-w-2xl text-sm md:text-base text-indigo-200">
              Discover thousands of verified opportunities, apply faster, and
              build a career you’re proud of.
            </p>

            <div className="mx-auto max-w-4xl rounded-2xl bg-white/95 p-2 shadow-2xl backdrop-blur">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 text-gray-700">
                <div className="flex items-center gap-3 px-5 flex-1">
                  <img
                    src={assets.search_icon}
                    alt=""
                    className="h-4 opacity-70"
                  />
                  <input
                    type="text"
                    placeholder="Job title or keyword"
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>

                <div className="hidden sm:block h-6 w-px bg-gray-200" />

                <div className="flex items-center gap-3 px-5 flex-1">
                  <img
                    src={assets.search_icon}
                    alt=""
                    className="h-4 opacity-70"
                  />
                  <input
                    type="text"
                    placeholder="City or remote"
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>

                <button className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-10 py-3 text-white text-sm font-semibold transition-all hover:shadow-xl hover:scale-[1.02] active:scale-95 cursor-pointer">
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

        <div className="flex items-center justify-center gap-6 sm:gap-10 overflow-x-auto whitespace-nowrap pt-2 pb-4">
          <div className="flex items-center justify-center rounded-xl bg-white px-10 py-6 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
            <img
              src={assets.microsoft_logo}
              alt=""
              className="h-6 sm:h-7 shrink-0"
            />
          </div>
          <div className="flex items-center justify-center rounded-xl bg-white px-10 py-6 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
            <img
              src={assets.accenture_logo}
              alt=""
              className="h-6 sm:h-7 shrink-0"
            />
          </div>
          <div className="flex items-center justify-center rounded-xl bg-white px-10 py-6 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
            <img
              src={assets.walmart_logo}
              alt=""
              className="h-6 sm:h-7 shrink-0"
            />
          </div>
          <div className="flex items-center justify-center rounded-xl bg-white px-10 py-6 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
            <img
              src={assets.amazon_logo}
              alt=""
              className="h-6 sm:h-7 shrink-0"
            />
          </div>
          <div className="flex items-center justify-center rounded-xl bg-white px-10 py-6 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
            <img
              src={assets.adobe_logo}
              alt=""
              className="h-6 sm:h-7 shrink-0"
            />
          </div>
          <div className="flex items-center justify-center rounded-xl bg-white px-10 py-6 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
            <img
              src={assets.samsung_logo}
              alt=""
              className="h-6 sm:h-7 shrink-0"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
