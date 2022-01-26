const { connection } = require("./connection");

exports.createField = (req, res) => {
  const name = req.body.passenger_name;
  const dept_loc = req.body.dept_loc;
  const arr_loc = req.body.arr_loc;
  const dept_date = req.body.dept_date;
  const arr_date = req.body.arr_date;
  const phone = req.body.ph_no;
  const email = req.body.email;

  connection.query(
    `INSERT INTO data VALUES ('${name}', '${dept_loc}', '${arr_loc}', '${dept_date}', '${arr_date}', '${phone}', '${email}');`,
    (error, result, fields) => {
      if (error) throw error;

      return res.send(result);
    }
  );
};

exports.readField = (req, res) => {
  connection.query("SELECT * FROM data;", (error, result, fields) => {
    if (error) throw error;

    //console.log(result);
    return res.send(result);
  });
};

exports.updateField = (req, res) => {
  const name = req.body.passenger_name;
  const dept_loc = req.body.dept_loc;
  const arr_loc = req.body.arr_loc;
  const dept_date = req.body.dept_date;
  const arr_date = req.body.arr_date;
  const phone = req.body.ph_no;
  const email = req.body.email;

  connection.query(
    `UPDATE data
    SET 
    passenger_name = '${name}',
    dept_loc = '${dept_loc}',
    arr_loc = '${arr_loc}',
    dept_date = '${dept_date}',
    arr_date = '${arr_date}',
    email = '${email}'
    WHERE ph_no = '${phone}';`,
    (error, result, fields) => {
      if (error) throw error;

      return res.send(result);
    }
  );
};

exports.deleteField = (req, res) => {
  const phone = req.body.ph_no;

  connection.query(
    `DELETE FROM data WHERE ph_no = '${phone}';`,
    (error, result, fields) => {
      if (error) throw error;

      return res.send(result);
    }
  );
};
