export function TransactionsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl animate-pulse">
      <div className="grid grid-cols-2 md:grid-cols-3 items-center justify-items-center border-b border-slate-700/50 px-4 gap-4 py-6">
        <div className="hidden md:inline-block w-full text-center">
          <div className="h-6 w-48 bg-slate-700/50 rounded mx-auto" />
          <div className="h-4 w-64 bg-slate-700/30 rounded mt-2 mx-auto" />
        </div>

        <div className="h-10 w-40 bg-slate-700/50 rounded-xl" />

        <div className="h-10 w-32 bg-slate-700/50 rounded-xl" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50">
              {Array.from({ length: 4 }).map((_, i) => (
                <th key={i} className="px-8 py-6 text-left">
                  <div className="h-4 w-24 bg-slate-700/50 rounded" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 4 }).map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className={`border-b border-slate-700/30 ${
                  rowIndex % 2 === 0 ? 'bg-slate-800/20' : 'bg-slate-800/10'
                }`}
              >
                {Array.from({ length: 4 }).map((_, colIndex) => (
                  <td key={colIndex} className="px-8 py-6">
                    <div className="h-4 w-28 bg-slate-700/40 rounded" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
