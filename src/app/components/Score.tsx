"use client";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";

interface OverDetails {
  over: number;
  runs: number;
  wickets: number;
  balls: string[];
  bowler: string;
}
const Score = () => {
  const [runs, setRuns] = useState<number>(0);
  const [wickets, setWickets] = useState<number>(0);
  const [overs, setOvers] = useState<number>(1);
  const [ballsInOver, setBallsInOver] = useState<string[]>([]);
  const [balls, setBalls] = useState<number>(0);
  const [overHistory, setOverHistory] = useState<OverDetails[]>([]);
  const [lastSelectedValue, setLastSelectedValue] = useState<string | "">("");
  const [bowlerName, setBowlerName] = useState<string>("");

  const handleAdd = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const action = event.target.value;

    if (action === lastSelectedValue) {
      return;
    }

    setLastSelectedValue(action);

    if (action === "wicket") {
      setWickets(wickets + 1);
      addBall("Wicket");
    }  else if (action === "wide") {
      setRuns(runs + 1); // Wide counts as 1 run.
      addBall("Wide");
    }else {
      const runValue = parseInt(action, 10);
      if (!isNaN(runValue)) {
        setRuns(runs + runValue);
        addBall(`${runValue} Run`);
      }
    }
  };

  const addBall = (result: string) => {
    if (result === "Wide") {
      const newBall = `${overs}.${ballsInOver.length + 1}: ${result}`;
      setBallsInOver([...ballsInOver, newBall]);
      // Don't increment the balls count for wide balls
      return;
    }
  
    if (balls < 6) {
      const newBall = `${overs}.${ballsInOver.length + 1}: ${result}`;
      setBallsInOver([...ballsInOver, newBall]);
      setBalls(balls + 1);
    }
  
    if (balls === 6) {
      const overDetails: OverDetails = {
        over: overs,
        runs: runs,
        wickets: wickets,
        balls: ballsInOver,
        bowler: bowlerName,
      };
  
      setOverHistory([...overHistory, overDetails]);
  
      // Reset balls and ballsInOver only if it's not a wide ball
      setBalls(0);
      setBallsInOver([]);
      setOvers(overs + 1);
      setRuns(0);
      setWickets(0);
    }
  };
  
  

  const handleDeleteBall = (index: number) => {
    const updatedBallsInOver = ballsInOver.slice();
    updatedBallsInOver.splice(index, 1);
    setBallsInOver(updatedBallsInOver);
    setBalls(balls - 1);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-[#090979] to-black text-white p-8">
      <p className="text-3xl font-bold  text-red-500">Score Counter</p>
      <p className="text-sm font-medium mb-4 text-gray-300">
        by @Danish Shaikh
      </p>
      <div className="mb-4  text-center">
        <p className="text-[22px] font-medium">
          Total Runs: <span className="text-green-500"> {runs}</span>
        </p>
        <p className="text-[22px] font-medium">
          Total Wickets: <span className="text-red-500"> {wickets}</span>
        </p>
        <p className="text-[22px] font-medium">Total Overs: {overs}</p>
      </div>

      <div className="mb-4 w-[200px]">
        <Select
          color="warning"
          label="Add Runs or Wickets"
          onChange={handleAdd}
        >
          <SelectItem key="0" value="0">
            0
          </SelectItem>
          <SelectItem key="1" value="1">
            Single
          </SelectItem>
          <SelectItem key="2" value="2">
            Double
          </SelectItem>
          <SelectItem key="4" value="4">
            Four
          </SelectItem>
          <SelectItem key="6" value="6">
            Sixer
          </SelectItem>
          <SelectItem key="wide" value="wide" style={{ color: "#0067B3" }}>
            Wide
          </SelectItem>
          <SelectItem key="wicket" value="wicket" style={{ color: "red" }}>
            Wicket
          </SelectItem>
        </Select>
        <Input
          color="success"
          className="mt-2 hover:shadow-lg transition duration-300"
          type="text"
          value={bowlerName}
          onChange={(e) => setBowlerName(e.target.value)}
          placeholder="Enter Bowler Name"
        />
      </div>

      <div className="mt-4">
        <p className="text-xl font-bold text-center">Balls in Over:</p>
        <ul className="list-disc pl-4">
          {ballsInOver.map((ball, index) => (
            <li
              key={index}
              className="flex justify-between items-center gap-2 space-y-2"
            >
              <span
                 className={
                  ball.includes("Wide")
                    ? "text-yellow-500"
                    : ball.includes("Wicket")
                    ? "text-red-500"
                    : ""
                }
              >
                {ball}
              </span>
              <Button
                size="sm"
                className="text-red-500 font-medium hover:text-red-700 bg-red-200 cursor-pointer"
                onClick={() => handleDeleteBall(index)}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <p className="text-xl font-bold text-center">Over History:</p>
        <ul>
          {overHistory.map((over, index) => (
            <li key={index} className=" p-2 rounded-lg transition duration-300">
              <p className="text-[22px] font-medium">
                {over.over} over by {over.bowler}
              </p>
              <ul className="text-center">
                {over.balls.map((ball, index) => (
                  <li key={index}>
                    <span
                       className={
                        ball.includes("Wide")
                          ? "text-yellow-500"
                          : ball.includes("Wicket")
                          ? "text-red-500"
                          : ""
                      }
                    >
                      {ball}
                    </span>
                  </li>
                ))}
                <p className="text-[22px] font-medium">
                  Total Runs:{" "}
                  <span className="text-green-500"> {over.runs}</span>
                </p>
                <p className="text-[22px] font-medium">
                  Total Wickets:{" "}
                  <span className="text-red-500"> {over.wickets}</span>
                </p>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Score;
