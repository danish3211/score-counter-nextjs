"use client"
import { Input, Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";

interface OverDetails {
  over: number;
  runs: number;
  wickets: number;
  balls: string[];
  bowler: string;
}
const page = () => {
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
    } else {
      const runValue = parseInt(action, 10);
      if (!isNaN(runValue)) {
        setRuns(runs + runValue);
        addBall(`${runValue} Run`);
      }
    }
  };

  const addBall = (result: string) => {
    const newBall = `${overs}.${ballsInOver.length + 1}: ${result}`;
    setBallsInOver([...ballsInOver, newBall]);
    setBalls(balls + 1);

    if (balls === 5) {
      const overDetails: OverDetails = {
        over: overs,
        runs: runs,
        wickets: wickets,
        balls: ballsInOver,
        bowler: bowlerName,
      };

      setOverHistory([...overHistory, overDetails]);

      setBalls(0);
      setBallsInOver([]);
      setOvers(overs + 1);
      setRuns(0);
      setWickets(0);
    }
  };
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-[#090979] to-black text-white p-8">
    <p className="text-3xl font-bold mb-4 text-red-500">Score Counter</p>

    <div className="mb-4  text-center">
      <p className="text-xl">Runs: {runs}</p>
      <p className="text-xl">Wickets: {wickets}</p>
      <p className="text-xl">Total Overs: {overs}</p>
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
        <SelectItem key="wicket" value="wicket">
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
      <p className="text-xl font-bold">Balls in Over:</p>
      <ul className="list-disc pl-4">
        {ballsInOver.map((ball, index) => (
          <li key={index}>{ball}</li>
        ))}
      </ul>
    </div>

    <div className="mt-4">
      <p className="text-xl font-bold">Over History:</p>
      <ul>
        {overHistory.map((over, index) => (
          <li key={index} className=" p-4 rounded-lg transition duration-300">
            Over {over.over} - Runs: {over.runs}, Wickets: {over.wickets},{" "}
            Bowler: {over.bowler}
            <ul>
              {over.balls.map((ball, index) => (
                <li key={index}>{ball}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
};

export default page;
