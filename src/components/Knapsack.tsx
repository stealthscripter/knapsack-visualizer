import { useState } from "react";
import KnapsackApp from "../KnapsackApp";
type Item = {
  profit: number;
  weight: number;
};

type Result = {
  fractional: {
    maxProfit: number;
    solution: (number | string)[];
  };
  zeroOne: {
    maxProfit: number;
    solution: number[];
    table: number[][];
  };
};

function Knapsack() {
  const [items, setItems] = useState<Item[]>([]);
  const [capacity, setCapacity] = useState<number>(0);
  const [result, setResult] = useState<Result | null>(null);

  const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value) || 0;
    setItems(Array.from({ length: count }, () => ({ profit: 0, weight: 0 })));
  };

  const handleItemChange =
    (index: number, field: keyof Item) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value) || 0;
      setItems((prev) =>
        prev.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        )
      );
    };

  const handleCalculate = () => {
    if (!items.length || capacity <= 0) return;

    const fractionalResult = knapsackFractional(capacity, items);
    const zeroOneResult = knapsack01(capacity, items);

    setResult({
      fractional: fractionalResult,
      zeroOne: zeroOneResult,
    });
  };

  const knapsackFractional = (capacity: number, items: Item[]) => {
    const sorted = items
      .map((item, i) => ({
        ...item,
        density: item.profit / item.weight,
        index: i,
      }))
      .sort((a, b) => b.density - a.density);

    let remaining = capacity;
    let profit = 0;
    const solution = Array(items.length).fill(0);

    for (const { profit: p, weight: w, index } of sorted) {
      if (w <= remaining) {
        profit += p;
        remaining -= w;
        solution[index] = 1;
      } else if (remaining > 0) {
        profit += (p * remaining) / w;
        solution[index] = `${remaining}/${w}`;
        remaining = 0;
      }
    }

    return { maxProfit: profit, solution };
  };

  const knapsack01 = (capacity: number, items: Item[]) => {
    const n = items.length;
    const dp: number[][] = Array.from({ length: n + 1 }, () =>
      Array(capacity + 1).fill(0)
    );

    for (let i = 1; i <= n; i++) {
      const { profit, weight } = items[i - 1];
      for (let w = 0; w <= capacity; w++) {
        if (weight <= w) {
          dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weight] + profit);
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }

    const solution = Array(n).fill(0);
    let i = n;
    let w = capacity;
    while (i > 0 && w > 0) {
      if (dp[i][w] !== dp[i - 1][w]) {
        solution[i - 1] = 1;
        w -= items[i - 1].weight;
      }
      i--;
    }

    return { maxProfit: dp[n][capacity], solution, table: dp };
  };

  return (
    <div className="mt-40 border border-zinc-400 p-4 col-start-2 col-span-5 grid grid-cols-5 my-20 font-josefin">
      <h1 className="text-center text-4xl col-span-5">Knapsack Calculator</h1>
      <p className="text-xl leading-9 text-center col-span-5">leave it.</p>

      <section className="col-start-2 col-span-3">
        <div className="my-2 p-4 flex justify-center space-x-10">
          <input
            type="number"
            min={1}
            className="border border-zinc-300 py-2 px-4 capitalize"
            placeholder="number of items"
            onChange={handleRowsChange}
          />
          <input
            type="number"
            min={0}
            className="border border-zinc-300 py-2 px-4 capitalize"
            placeholder="knapsack capacity"
            value={capacity === 0 ? "" : capacity}
            onChange={(e) => setCapacity(parseInt(e.target.value))}
          />
        </div>
      </section>

      <section className="col-start-2 col-span-3 flex justify-center items-start">
        {items.length >= 1 && (
          <table className={`table-auto`}>
            <thead>
              <tr className="">
                <th className="text-center text-zinc-300 pt-5 pb-3">Item</th>
                <th className="text-center text-zinc-300 pt-5 pb-3">Profit</th>
                <th className="text-center text-zinc-300 pt-5 pb-3">Weight</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, i) => (
                <tr key={i}>
                  <td className="border px-4 py-2">Item {i + 1}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      placeholder="value"
                      min={0}
                      value={item.profit === 0 ? "" : item.profit}
                      onChange={handleItemChange(i, "profit")}
                      className="w-full p-1 outline-none"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      placeholder="value"
                      min={0}
                      value={item.weight === 0 ? "" : item.weight}
                      onChange={handleItemChange(i, "weight")}
                      className="w-full p-1 outline-none"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="col-start-1 col-end-6 grid grid-cols-5  border mt-10">
        {result && (
          <>
            {/* 0-1 knapsack */}
            <div className="col-start-1 col-end-3 text-center">
              <h4 className="font-semibold text-2xl my-1">Knapsack 0/1</h4>
              <p className="my-2 text-base">Resultant Table</p>
              <table className="table-auto w-full">
                <tbody>
                  {result.zeroOne.table.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j} className="border px-2 py-1">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* fractional knapsack */}

            <div className="text-center">
              <h3 className="text-lg font-semibold">Fractional Knapsack</h3>
              <p>Max Profit: {result.fractional.maxProfit.toFixed(2)}</p>
              <p>Solution: {result.fractional.solution.join(", ")}</p>

              <h3 className="text-lg font-semibold">0/1 Knapsack</h3>
    
            </div>
          </>
        )}
      </section>
      <div className="col-start-3 col-end-4 flex justify-center mt-5">
        <button
          onClick={handleCalculate}
          className="border border-zinc-200 hover:bg-white hover:text-slate-900 duration-300 cursor-pointer px-4 py-2 rounded my-5"
        >
          Calculate
        </button>
      </div>
    </div>
  );
}

export default Knapsack;
