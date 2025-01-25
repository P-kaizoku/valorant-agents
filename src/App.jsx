import React from "react";
import { useState, useEffect } from "react";

const PlayerCard = ({ data }) => {
  return (
    <div className="wrapper  w-full h-full flex justify-center items-center">
      <div className="card w-[300px] h-full bg-neutral-600 p-6 rounded-2xl drop-shadow-2xl text-white font-mono">
        <div className="card-image m-4 border-2 border-neutral-800 rounded-full overflow-hidden shadow-amber-200 shadow-2xl  bg-neutral-200 ">
          <img
            className=" drop-shadow-2xl"
            src={data.displayIcon}
            alt={data.displayName}
          />
        </div>
        <div className="card-content">
          <h1 className="text-3xl font-bold  border-b uppercase mb-4">
            {data.displayName}
          </h1>
          <div className="px-2 py-1 border-dashed border-2 rounded-md border-amber-200 mb-4">
            <p className="text-red-400 font-semibold text-xl">
              {data.role.displayName}
            </p>
            <p>{data.role.description}</p>
          </div>
        </div>
        <div className="role-abilities">
          <h2 className="text-2xl mb-2">Abilities</h2>
          <div className="abilities grid grid-cols-2 gap-4">
            {data.abilities.map((ability, index) => (
              <div
                key={index}
                className="ability border-dashed border-2 border-amber-200 p-2 rounded-lg"
              >
                <h3>
                  <img width="48px" src={ability.displayIcon} alt="" />
                  {ability.displayName}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [agentList, setAgentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const API_URL = "https://valorant-api.com/v1/agents";
  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const fetchAgents = async () => {
    try {
      const response = await fetch(API_URL, API_OPTIONS);
      if (!response.ok) {
        setErrorMessage("Something went wrong");
      }

      const agentData = await response.json();
      console.log(agentData);

      if (agentData.response === "error") {
        setErrorMessage(agentData.message);
        setAgentList([]);
        return;
      }

      setAgentList(agentData.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div className="app bg-neutral-400 scroll-smooth">
      <h1 className="bg-red-500 h-14 font-bold uppercase text-center py-4 text-2xl">
        Valorant Agents
      </h1>
      <p className="bg-amber-100 h-8 text-center text-emerald-600">Showcasing all the playable agents in valorant :)</p>
      {isLoading && (
        <p className="text-xl flex justify-center items-center bg-neutral-800 text-white h-screen w-screen">
          Loading...
        </p>
      )}
      {errorMessage && <p>{errorMessage}</p>}
      <div className="card-container grid grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] gap-4 p-4">
        {agentList.map((agent) =>
          agent.role ? (
            <PlayerCard key={agent.uuid} data={agent} />
          ) : (
            null
          )
        )}
      </div>
    </div>
  );
};

export default App;
