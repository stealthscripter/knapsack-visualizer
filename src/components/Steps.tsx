const steps = [
  {
    title: "Set Capacity",
    description: "Enter your knapsack's maximum weight limit (e.g., 20kg)"
  },
  {
    title: "Input Items",
    description: "Add items with their profit (value) and weight (e.g., Item 1: $500 profit, 3kg weight)"
  },
  {
    title: "Get Results",
    description: "Click 'Calculate' to see optimal selections for both 0/1 and fractional knapsack solutions"
  }
];

function Steps() {
  return (
    <div className="col-start-3 col-span-3 mt-52 flex flex-col space-y-24">
      {/* step 1 */}

      {steps.map((step, index) => (
        <div className="font-josefin grid grid-cols-2 space-x-10">
          {index % 2 === 0 ? (
            <>
              <div className="flex flex-col text-zinc-400">
                <h1 className="uppercase">Step 0{index + 1}</h1>
                <h4 className="text-3xl text-white my-3">{step.title}</h4>
                <p className="text-xl">{step.description}</p>
              </div>
              <div className=""></div>
            </>
          ) : (
            <>
              <div className=""></div>
              <div className="flex flex-col text-zinc-400">
                <h1 className="uppercase">Step 0{index + 1}</h1>
                <h4 className="text-3xl text-white my-3">{step.title}</h4>
                <p className="text-xl">{step.description}</p>
              </div>
            </>
          )}
        </div>
      ))}

      {/* step 2 */}
    </div>
  );
}

export default Steps;
