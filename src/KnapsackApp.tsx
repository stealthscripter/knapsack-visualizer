import { useState } from "react";

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

const KnapsackApp = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [capacity, setCapacity] = useState<number>(0);
  const [result, setResult] = useState<Result | null>(null);

  const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value) || 0;
    setItems(Array.from({ length: count }, () => ({ profit: 0, weight: 0 })));
  };

  const handleItemChange = (index: number, field: keyof Item) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
    <div className="p-4">
      <div className="mb-4">
        <input
          type="number"
          placeholder="Number of items"
          onChange={handleRowsChange}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(parseInt(e.target.value))}
          className="border p-2"
        />
      </div>

      <table className="table-auto mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Item</th>
            <th className="px-4 py-2">Profit</th>
            <th className="px-4 py-2">Weight</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td className="border px-4 py-2">Item {i + 1}</td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={item.profit}
                  onChange={handleItemChange(i, "profit")}
                  className="w-20 p-1"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={item.weight}
                  onChange={handleItemChange(i, "weight")}
                  className="w-20 p-1"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleCalculate}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Calculate
      </button>

      {result && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Results</h2>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Fractional Knapsack</h3>
            <p>Max Profit: {result.fractional.maxProfit.toFixed(2)}</p>
            <p>Solution: {result.fractional.solution.join(", ")}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">0/1 Knapsack</h3>
            <p>Max Profit: {result.zeroOne.maxProfit}</p>
            <p>Solution: {result.zeroOne.solution.join(", ")}</p>
            
            <div className="mt-2">
              <h4 className="font-semibold">DP Table</h4>
              <table className="table-auto">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default KnapsackApp;