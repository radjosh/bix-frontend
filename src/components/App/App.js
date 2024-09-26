import React from "react";

/**********************************
 * next:
 * 
 */

function App() {
  const ENDPOINT = "http://127.0.0.1:8899/test/";
  const [workers, setWorkers] = React.useState([]);
  const [averages, setAverages] = React.useState([]);
  const initialTitles = workers.map(worker => worker.attributes.title);
  const [selectedTitles, setSelectedTitles] = React.useState(initialTitles);

  const handleSelectChange = (index, value) => {
    const newSelectedTitles = [...selectedTitles];
    newSelectedTitles[index] = value;
    setSelectedTitles(newSelectedTitles);

    const updatedWorkers = [...workers];
    updatedWorkers[index].attributes.title = value;
    setWorkers(updatedWorkers);
  };

  // load data on page load
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

  }, []);

  // update averages whenever workers info changes
  React.useEffect(() => {
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
    const asArray = Array.from(s.entries());
    setAverages(() => asArray);
  }, [workers]);

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
              <td>
                <form>
                <select
                 value={selectedTitles[index]}
                 onChange={event => {
                  handleSelectChange(index, event.target.value)
                 }}
                 defaultValue={title}
                >
                  <option value="CEO">CEO</option>
                  <option value="Grunt">Grunt</option>
                  <option value="Sales">Sales</option>
                  <option value="Specialist">Specialist</option>
                </select>
                </form></td>
              <td>{index}</td>
            </tr>
        ))}
        </tbody>
      </table>
      <hr />
      <table>
        <thead><tr><th><strong>Title</strong></th><th><strong>Average</strong></th></tr></thead>
        <tbody>
          {averages?.map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value.average}</td>
            </tr>
        ))}
        </tbody>
      </table>   
    </div>
  )
}

export default App;
