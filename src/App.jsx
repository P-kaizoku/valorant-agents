import React from "react";
import { useState, useEffect } from "react";

const PlayerCard = ({ data }) => {
  return (
    <div className="wrapper bg-red-100">
      <div className="card">
        <div className="card-image">
          <img src={data.displayIcon} alt={data.displayName} />
        </div>
        <div className="card-content">
          <h1>{data.displayName}</h1>
          <p>{data.role.displayName}</p>
          <p>{data.role.description}</p>
        </div>
        <div className="role-abilities">
          <h2>Abilities</h2>
          <div className="abilities">
            {data.abilities.map((ability, index) => (
              <div key={index} className="ability">
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
    <div className="app">
      <h1>Valorant Agents</h1>
      {isLoading && <p>Loading...</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <div className="card-container">
        {agentList.map((agent) =>
          agent.role ? (
            <PlayerCard key={agent.uuid} data={agent} />
          ) : (
            <div key={agent.uuid}></div>
          )
        )}
      </div>
    </div> 
  );
};

export default App;
