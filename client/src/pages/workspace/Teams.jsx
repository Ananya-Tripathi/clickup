// import React, { useEffect, useState } from "react";
// import axios from "axios";
// const Teams = () => {
//   const [teams, setTeams] = useState([]);

//   async function getTeams() {
//     const { data } = await axios.get("http://localhost:5000/api/team");
//     setTeams(data);
//     console.log(teams);
//   }
//   useEffect(() => {
//     getTeams();
//   }, []);
//   return (
//     <div className="bg-darkGrey h-[300px] m-1 w-[200px] flex-shrink-0 p-4 text-center">
//       <h1 className="headText text-lg border-b-2 border-white ">Teams</h1>
//       {/* {teams.map((team) => {
//         return <p>{team.name}</p>;
//       })} */}
//     </div>
//   );
// };

// export default Teams;

import React, { useEffect, useState } from "react";
import axios from "axios";

const Teams = () => {
  const [teams, setTeams] = useState([]);

  async function getTeams() {
    try {
      const { data } = await axios.get("http://localhost:5000/api/team");
      setTeams(data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  }

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <div className="bg-darkGrey h-[300px] m-1 w-[200px] flex-shrink-0 p-4 text-center">
      <h1 className="headText text-lg border-b-2 border-white ">Teamssss</h1>

      <div className="my-2 overflow-scroll">
        {teams.map((team) => {
          return (
            <p className="headText text-md rounded-sm bg-lightGrey my-2 ">
              {team.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Teams;
