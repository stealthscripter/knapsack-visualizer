function Hero() {
  return (
    <div className="col-start-2 col-end-7 font-josefin md:py-52 pb-56 pt-32 text-center md:px-0 px-5">
      <h1 className="md:text-6xl text-5xl leading-16 md:leading-none font-semibold">
        Optimize Your Decisions
      </h1>
      <p className="md:text-2xl text-xl leading-8 mb-8 max-w-2xl mx-auto mt-4 text-zinc-300 md:leading-10">
        Solve complex knapsack problems with our algorithm toolkit
      </p>
      <a href="#knapsack">
        <button className="border mt-5 md:mt-5 border-zinc-200 px-6 py-3 cursor-pointer text-xl hover:bg-zinc-200 hover:text-slate-800 duration-300">
          Try Now
        </button>
      </a>
    </div>
  );
}

export default Hero;
