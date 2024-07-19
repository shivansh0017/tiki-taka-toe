import GridLoader from "react-spinners/GridLoader";

function App() {
  let loading = true;
  let color  = "#36D7B7";

  return (
    <div className="sweet-loading">
      <GridLoader
        color={color}
        loading={loading}
        size={25} 
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default App;