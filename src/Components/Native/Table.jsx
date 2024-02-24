import React from 'react'

function Table() {
  return (
    <div>
      <table border={1} width='100%' cellPadding={10} cellSpacing={15}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Pincode</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Modi</td>
            <td>modi@bjp.cm</td>
            <td>10d001</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Pinu</td>
            <td>pinu@cpim.com</td>
            <td>695001</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Table