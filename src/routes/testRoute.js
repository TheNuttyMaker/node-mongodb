export const testRoute = {
  path: "/api/test",
  method: "get",
  handler: (req, res) => {
    res.status(200).send("It works!");
  },
};

export const defaultRoute = {
  path: "/",
  method: "get",
  handler: (req, res) => {
    res.status(200).send("Welcome! The Node server works. Check Readme to see how to use other API endpoints");
  },
};
    
