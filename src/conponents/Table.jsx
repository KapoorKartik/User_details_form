import { TableItems } from "./Tableitem.jsx";

export const Table = ({ item }) => {
  console.log("item", { item });
  //   item.map((e) => {
  //     console.log("mapping", e.name);
  //   });
  return (
    <>
      <table cellSpacing={10}>
        <thead>
          <td>Name</td>
          <td>Age</td>
          <td>Address</td>
          <td>Department</td>
          <td>Salary</td>
          <td>Marital Status</td>
          <td>Profile Photo</td>
        </thead>
        <tbody>
          {item.map((e) => {
            console.log(e.name);
            return <TableItems {...e} />;
          })}
        </tbody>
      </table>
    </>
  );
};
