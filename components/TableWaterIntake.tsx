const ageGroups = [
  {
    name: '1-3 years',
    value: '1.3-2.1 liters (44-72 ounces)',
  },
  {
    name: '4-8 years',
    value: '1.7-2.4 liters (57-81 ounces)',
  },
  {
    name: '9-13 years',
    value: '2.4-3.3 liters (81-112 ounces)',
  },
  {
    name: '14-18 years (boys)',
    value: '3.3-3.7 liters (112-125 ounces)',
  },
  {
    name: '14-18 years (girls)',
    value: '2.3-2.7 liters (78-91 ounces)',
  },
  {
    name: 'Adults (men)',
    value: '3.7 liters (125 ounces)',
  },
  {
    name: 'Adults (women)',
    value: '2.7 liters (91 ounces)',
  },
]

export function TableWaterIntake() {
  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <caption className="sr-only">
              Recommended Daily Water Intake
            </caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Age Group
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Recommended Daily Water Intake
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ageGroups.map((ageGroup) => (
                <tr key={ageGroup.name}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    {ageGroup.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span className="block">{ageGroup.value}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
