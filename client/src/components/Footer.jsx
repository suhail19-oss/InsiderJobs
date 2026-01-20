import { assets } from "../assets/assets.js";

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="container mx-auto 2xl:px-20 px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <img src={assets.logo} alt="" className="h-8" />
            <p className="text-sm text-slate-500">
              © InsiderJobs. All Rights Reserved
            </p>
          </div>

          <div className="flex items-center gap-5">
            <img
              src={assets.facebook_icon}
              alt=""
              className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100 transition"
            />
            <img
              src={assets.twitter_icon}
              alt=""
              className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100 transition"
            />
            <img
              src={assets.instagram_icon}
              alt=""
              className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100 transition"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
