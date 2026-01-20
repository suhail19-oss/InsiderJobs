import { assets } from "../assets/assets.js";

function AppDownload() {
  return (
    <div className="container px-4 2xl:px-20 mx-auto my-13">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 px-8 py-14 sm:px-14 sm:py-20 lg:px-20 lg:py-24 text-white shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.14),transparent_55%)]" />

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-xl text-center lg:text-left">
            <span className="inline-block mb-4 rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-200">
              Mobile App
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-5">
              Get the App for a Better Job Search Experience
            </h2>

            <p className="text-sm sm:text-base text-blue-100/80 mb-8">
              Search jobs, apply faster, and stay updated on the go with our
              mobile app.
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-4">
              <a href="#" className="cursor-pointer transition hover:scale-105">
                <img src={assets.play_store} alt="" className="h-12" />
              </a>
              <a href="#" className="cursor-pointer transition hover:scale-105">
                <img src={assets.app_store} alt="" className="h-12" />
              </a>
            </div>
          </div>

          <div className="relative">
            <img
              src={assets.app_main_img}
              alt=""
              className="w-[260px] sm:w-[300px] lg:w-[340px] drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppDownload;
