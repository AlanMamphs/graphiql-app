const nestedObject = {
  employees: [
    {
      firstName: 'John',
      lastName: 'Doe',
    },
    {
      firstName: 'Anna',
      lastName: 'Smith',
    },
    {
      firstName: 'Peter',
      lastName: 'Jones',
    },
  ],
};
export const JsonViewer = () => {
  return (
    <div className="contents">
      <pre className="overflow-auto">
        {JSON.stringify(nestedObject, null, 1)}
      </pre>
    </div>
  );
};
