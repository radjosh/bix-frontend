import React from "react";

/**********************************
 * next:
 * load data on page load only
 * i.e. there's no form!
 * 
 * also, come to think of it, why use python at all if
 * the data is essentially small and hard-coded
 * 
 * the juice is in the react
 */

function App() {
  const ENDPOINT = "http://127.0.0.1:8899/test/";
  const [result, setResult] = React.useState([]);

  React.useEffect(() => {
    const hitApiOnPageLoad = async () => {
      const url = new URL(ENDPOINT);
      try {
        const response = await fetch(url, {
          method: "GET",
        });
        const json = await response.json();
        setResult(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    hitApiOnPageLoad();
  }, []);

  React.useEffect(() => {
    console.log('Fetched result:', result); // Check the structure
  }, [result]);

  return (
    <div>
      {/* <h1>{result}</h1> */}
     <ul>
        {result?.map(({ name, attributes: { salary, title } }) => (
          <li key={crypto.randomUUID()}>
            {name} {salary} {title}
          </li>
        ))}
      </ul> 
    </div>
  )
}

export default App;
