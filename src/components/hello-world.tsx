const test = (say: string) => {
  alert("Hello," + say);
};
export const HelloWorld = () => {
  return (
    <>
      <h1
        onClick={() => test("h1")}
        className=" hover:cursor-pointer hover:text-red-600 text-center"
      >
        React Hello App Test h1
      </h1>
      <h2
        onClick={() => test("h2")}
        className=" hover:cursor-pointer hover:text-red-600 text-center"
      >
        React Hello App Test h2
      </h2>
      <div className="text-center">
        <button onClick={() => test("button")}>React Test</button>
      </div>
    </>
  );
};
