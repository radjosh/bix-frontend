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
  const [workers, setWorkers] = React.useState([]);
  const [titles, setTitles] = React.useState([]);

  React.useEffect(() => {
    const hitApiOnPageLoad = async () => {
      const url = new URL(ENDPOINT);
      try {
        const response = await fetch(url, {
          method: "GET",
        });
        const json = await response.json();
        setWorkers(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    hitApiOnPageLoad();

  }, []);

  React.useEffect(() => {
    console.log('Fetched workers:', workers); // Check the structure
  }, [workers]);

  return (
    <div>
      <table>
        <tr><td><strong>Name</strong></td><td><strong>Salary</strong></td><td><strong>Title</strong></td></tr>
        {workers?.map(({name, attributes: { salary, title }}, index) => (
          <tr>
            <td>{name}</td>
            <td>{salary}</td>
            <td><form>{title}</form></td>
            <td>{index}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default App;
