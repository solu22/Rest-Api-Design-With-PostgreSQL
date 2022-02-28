const express = require("express");
const pool = require("../database/connection");
const dogsRouter = express.Router();

dogsRouter.get("/", async (req, res) => {
  try {
    const getDogs = await pool.query("SELECT * FROM dogstable");
    res.json(getDogs.rows);
  } catch (error) {
    console.log(error);
  }
});

dogsRouter.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const dog = await pool.query(`SELECT * FROM dogstable WHERE id = ${id} `);
    res.json(dog.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

dogsRouter.post("/", async (req, res) => {
  try {
    const { breed, address } = req.body;
    const newDogEntry = await pool.query(
      `Insert INTO dogstable (breed, address) VALUES ('${breed}', '${address}' ) RETURNING *`
    );
    res.json(newDogEntry.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

dogsRouter.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { breed, address } = req.body;
    const toUpdate = ` UPDATE dogstable 
        SET breed = '${breed}', 
        address = '${address}' 
        WHERE id = ${id}`;
    const updatedData = await pool.query(toUpdate);
    res.status(200).json({ message: "Successfully Updated Info" });
  } catch (error) {
    console.log(error.message);
  }
});

dogsRouter.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const toDelete = await pool.query(`DELETE FROM dogstable WHERE id = ${id}`);
    res
      .status(200)
      .json({ message: `Successfully deleted entry with id ${id}` });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = dogsRouter;
