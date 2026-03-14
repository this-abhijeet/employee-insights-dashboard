export const fetchEmployees = async () => {
  try {

    const response = await fetch(
      "https://backend.jotish.in/backend_dev/gettabledata.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          username: "test",
          password: "123456"
        })
      }
    );

    // DEBUG STEP 1
    console.log("HTTP STATUS:", response.status);

    // DEBUG STEP 2
    const rawText = await response.text();
    console.log("RAW API RESPONSE:", rawText);

    // convert raw text to JSON
    const result = JSON.parse(rawText);

    console.log("PARSED JSON:", result);

    const rows = result?.TABLE_DATA?.data || [];

    const employees = rows.map((row, index) => ({
      id: index + 1,
      name: row[0],
      position: row[1],
      office: row[2],
      employeeId: row[3],
      startDate: row[4],
      salary: row[5]
    }));

    return employees;

  } catch (error) {
    console.error("API ERROR:", error);
    return [];
  }
};