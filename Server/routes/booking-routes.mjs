import express from "express";
import connectionPool from "../utils/db.mjs";
import { validationAuth, verifyAdmin } from "../middlewares/auth-validation.mjs";

const booking = express.Router();

// Post Booking for User
booking.post("/submit-booking",[validationAuth],async (req, res) => {
  
  try {
    const {
      user_name,
      email,
      phone,
      room_type,
      check_in,
      check_out,
      total_price,
      status,
      extras,
      price,
    } = req.body;
    
    const query = `
        INSERT INTO bookings (user_name, email, phone, room_type, check_in, check_out, total_price, status, extras, price) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;
      `;

    const values = [
      user_name,
      email,
      phone,
      room_type,
      check_in,
      check_out,
      total_price,
      status,
      extras,
      price,
    ];

    const result = await connectionPool.query(query, values);
   

    res
      .status(201)
      .json({ message: "Booking successful", booking: result.rows[0] });
  } catch (error) {
    console.error("Error inserting booking:", error);
    res.status(500).json({ message: "Booking failed", error });
  }
});

// Get Booking_data from email
booking.get("/:email",[validationAuth],async (req, res) => {
  const bookingDataFormEmail = req.params.email;
  let result;
  try {
    result = await connectionPool.query(
      `select * from bookings where email=$1  order by created_at desc`,
      [bookingDataFormEmail]
    );
    //console.log(result)
  } catch {
    return res.status(500).json({
      message: "Server could not read data because database connection",
    });
  }

  if (!result.rows[0]) {
    return res.status(404).json({
      "Not Found": "Data not found",
    });
  }
  return res.status(200).json({
    OK: "Successfully retrieved the data.",
    data: result.rows,
  });
});

// Get All Booking_data for Admin
booking.get("/",[verifyAdmin], async (req, res) => {
  let result;
  try {
    result = await connectionPool.query(`select * from bookings order by created_at desc`);
   
  } catch {
    return res.status(500).json({
      message: "Server could not read data because database connection",
    });
  }

  if (!result.rows[0]) {
    return res.status(404).json({
      "Not Found": "Data not found",
    });
  }
  return res.status(200).json({
    OK: "Successfully retrieved the data.",
    data: result.rows,
  });
});

//Delete BookinfData//
booking.delete("/delete/:id", [verifyAdmin],async (req,res)=>{
  const bookingDataFormId = req.params.id;
 let result
  try{  
  result = await connectionPool.query(
  `
  delete from bookings
    where id=$1
  `,[bookingDataFormId]  
);

// console.log(result)
if(result.rowCount==0) {
  return res.status(404).json({
    "Not Found": "Data not found"
 
  });
}
return res.status(200).json({    
  OK: "Successfully deleted the data" 
});

} catch (error) {
    return res.status(500).json({
      message: "Server could not delete data because database connection" 
    })
}
});

//Update Status By Admin
booking.patch("/update-status/:id",[verifyAdmin], async (req, res) => {
  const bookingId = req.params.id; 
  const { status } = req.body; 

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  try {    
    const checkBooking = await connectionPool.query(
      "SELECT * FROM bookings WHERE id = $1",
      [bookingId]
    );

    if (checkBooking.rows.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }
   
    const query = `
      UPDATE bookings
      SET status = $1
      WHERE id = $2
      RETURNING *;
    `;

    const result = await connectionPool.query(query, [status, bookingId]);

    return res.status(200).json({
      message: "Status updated successfully",
      updatedBooking: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json({ message: "Update failed", error });
  }
});

export default booking;
