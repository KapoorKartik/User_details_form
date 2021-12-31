export const TableItems = ({
  name,
  age,
  address,
  marital_status,
  department,
  salary,
  file,
}) => {
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{age}</td>
        <td>{address}</td>
        <td>{department}</td>
        <td>{salary}</td>
        <td>{marital_status}</td>
        <td>
          <img className="table_img" src={file} alt="profile_photo" />
        </td>
      </tr>
    </>
  );
};
