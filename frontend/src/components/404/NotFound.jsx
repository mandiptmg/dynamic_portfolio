import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export function DashboardNotFound() {
  return (
    <div className="">
      <main className="grid min-h-full place-items-center bg-[url(https://c4.wallpaperflare.com/wallpaper/917/245/80/anime-demon-slayer-kimetsu-no-yaiba-tanjirou-kamado-hd-wallpaper-thumb.jpg)] bg-black/50 bg-blend-overlay bg-no-repeat w-full h-screen bg-cover text-white  px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-5xl font-semibold ">404</p>
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-pretty text-lg font-medium text-gray-300 sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10">
            <Link
              to={"/dashboard"}
              className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 hover:border-2 transition-all duration-700 ease-in-out focus-visible:outline-offset-2 "
            >
              <button className=" items-center inline-flex text-center  gap-3 ">
                <FaArrowLeft /> Go back to dashboard
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export function PublicNotFound() {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-[url(https://c4.wallpaperflare.com/wallpaper/917/245/80/anime-demon-slayer-kimetsu-no-yaiba-tanjirou-kamado-hd-wallpaper-thumb.jpg)] bg-black/50 bg-blend-overlay bg-no-repeat w-full h-screen bg-cover text-white  px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-5xl font-semibold ">404</p>
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-pretty text-lg font-medium text-gray-300 sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10">
            <Link
              to={"/"}
              className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 hover:border-2 transition-all duration-700 ease-in-out focus-visible:outline-offset-2 "
            >
              <button className=" items-center inline-flex text-center  gap-3 ">
                <FaArrowLeft /> Go back home
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
