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
  const [infoByTitle, setInfoByTitle] = React.useState([]);
  const [entries, setEntries] = React.useState([]);

  React.useEffect(() => {
    const hitApiOnPageLoad = async () => {
      const url = new URL(ENDPOINT);
      try {
        const response = await fetch(url, {
          method: "GET",
        });
        const json = await response.json();
        setWorkers(() => json);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    hitApiOnPageLoad();

    const s = new Map();
    workers.forEach(worker => {
      if (s.has(worker.attributes.title)) {
        curr = s.get(worker.attributes.title);
        total = curr.total;
        num = curr.num;
        total += worker.attributes.salary;
        num += 1;
        average = total / num;
        s.set(worker.attributes.title, { total: total, num: num, average: average})
      } else {
        s.set(worker.attributes.title, { total: worker.attributes.salary, num: 1, average: worker.attributes.salary})
      }
    });
    // const s = new Object;
    // workers.forEach(worker => {
    //   if (worker.attributes.title in s) {
    //     curr = s[worker.attributes.title];
    //     total = curr.total;
    //     num = curr.num;
    //     total += worker.attributes.salary;
    //     num += 1;
    //     average = total / num;
    //     s[worker.attributes.title] = { total: total, num: num, average: average}
    //   } else {
    //     s[worker.attributes.title] = { total: worker.attributes.salary, num: 1, average: worker.attributes.salary}
    //   }
    // });
    setInfoByTitle(() => s);
    const entries = Array.from(s.entries());
    setEntries(() => entries);

  }, []);



  // React.useEffect(() => {
  //   console.log('Fetched workers:', workers); // Check the structure
  // }, [workers]);

 return (
    <div>
      <table>
        <thead><tr><th><strong>Name</strong></th><th><strong>Salary</strong></th><th><strong>Title</strong></th></tr></thead>
        <tbody>
          {workers?.map(({name, attributes: { salary, title }}, index) => (
            <tr key={index}>
              <td>{name}</td>
              <td>{salary}</td>
              <td><form>{title}</form></td>
              <td>{index}</td>
            </tr>
        ))}
        </tbody>
      </table>
      <hr />
      <table>
        <thead><tr><th><strong>Title</strong></th><th><strong>Average</strong></th></tr></thead>
        <tbody>
          {entries?.map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value.average}</td>
            </tr>
        ))}
        </tbody>
      </table>   </div>
  )
}

export default App;
