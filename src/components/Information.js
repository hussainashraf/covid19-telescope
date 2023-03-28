import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function Information({ title, cases, total }) {
  return (
    <Card className="">
      <CardContent>
        <Typography className="font-bold font-lg">{title}</Typography>
        <h2 className="text-xl font-bold">{cases}</h2>
        <Typography>{total} Total</Typography>
      </CardContent>
    </Card>
  );
}

export default Information;
